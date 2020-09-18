use crate::crypto::{Ripemd160Hash, Sha256Hash, sha256_hash, AesNonce, AesTag, aes_decrypt, ripemd160_hash};
use neon::prelude::*;
use neon::*;
use crate::bindings::js_helper::{property, byte_arr_property};
use std::convert::TryFrom;
use neon::result::Throw;
use crate::fs::FileManager;
use neon::macro_internal::runtime::nan::array::len;

pub struct Check {
    /* points need to be signed for negative checks (introducing vulnerabilities not preexisting
    on the system) */
    pub points: isize,
    pub check_type: CheckType
}

pub enum CheckType {
    /* Secure File Contains: Check if a file contains a string without knowing the string.

    assume we have 2 strings, S and V, where V is a substring of S. when given S, we can determine
    V, but without S it should be extremely difficult to find V. let's impose some restrictions on
    ourselves so our algorithm is secure.
        enumerate V (needed for decoding success message) when given S in O(n) time
        without S, figuring out V should take exponential time or worse, k^O(n), hopefully enough
        so it's not worth the time of anyone to find V
    First, what information should we store about V? We should ensure the information stored does
    not allow V to be found, but when combined with S, is a lot easier to find. I opted for storing
    a hash of V and the length of V, meaning that bruteforcing V would require (assuming printable
    ascii) 95^len(V) hashes to compute.

    the message field is the report message for passing the check, encrypted with aes-gcm using the
    sha256(ripemd160(sha256(plaintext))). computing sha256 is the difficult part, since it requires
    knowing the plaintext. to prevent bruteforcing, ripemd160, our salted algorithm, will hash this
    hash. finally, to create a key of AES size, we hash the ripemd160 result with sha256. */
    FileContains {
        file: String,
        hash: Ripemd160Hash,
        length: usize,
        message: Vec<u8>,
        nonce: AesNonce,
        tag: AesTag,
    },
    /*
    Secure File Does Not Contain: Check if a file does not contain a string without knowing the
    string.

    we cannot safely invert the condition of the FileContains because any attacker could hash
    the file segments themselves and find the hash of what they need to remove.

    TODO: this is pretty fucking hard. here's some ideas i have (but none of them are perfect)
        1. use hash of the concat of text surrounding the text the user must remove
        given string S and string to remove V in string S at index i, as well as some integer k:
            let concat_of_surroundings = S[i - k - 1:i - 1] + S[i + len(V):i + len(V) + k]
            let hash_of_surroundings = hash(concat_of_surroundings)
            hash_of_surroundings == stored_hash
        where stored_hash is given to the engine. concat_of_surroundings will only be in S if V is
        removed, and as a result, we can use the same algorithm as the FileContains.
        cons:
            this requires the surroundings to be constant!!! this is the biggest con

    because im quirky like that and this implementation is imperfect, we will use the insecure
    inverted FileContains until we get bullied hard enough into not using it.

    not adding a field to FileContains to signify not because this is subject to change and i dont
    feel like refactoring code when i need to redo the algorithm
    */
    FileNotContain {
        file: String,
        hash: Ripemd160Hash,
        length: usize,
        message: Vec<u8>,
        nonce: AesNonce,
        tag: AesTag,
    },
}

impl Check {
    /* if we pass a check, we can decode a message. attach the option to return a vec containing
    the message */
    pub fn is_passed(&self, fm: &mut FileManager) -> (bool, Option<Vec<u8>>) {
        match &self.check_type {
            CheckType::FileContains { file, length, hash, message, nonce, tag, .. } => {
                /* the cache might be updated if changes are made */

                fm.update_cached_file(file, *length).unwrap();
                if let Some(idx) = fm.file_contains(file, hash, *length) {
                    /* to decode the message, we must calculate sha256(ripemd160(sha256(plaintext))).*/
                    let mut plaintext = fm.plain_at_idx(file, idx, *length);
                    let key = sha256_hash(&ripemd160_hash(&sha256_hash(&*plaintext)));
                    let decrypted_message = aes_decrypt(message, &key, nonce, tag);
                    (true, Some(decrypted_message))
                } else {
                    (false, None)
                }
            },
            CheckType::FileNotContain { .. } => {
                (false, None)
            },
            _ => (false, None)
        }
    }

    pub fn get_type<'a>(type_name: &str, cx: &mut CallContext<JsUndefined>, value: &Handle<JsObject>) -> NeonResult<CheckType> {
        match type_name {
            "file_contains" => {
                let hash_vec = &*byte_arr_property(cx, value, "hash")?;
                /* because we have a string slice but we need to it be a constant size array so
                we need to try into a 20 byte array. ensure hash slice is exactly 20 bytes. */
                if hash_vec.len() != 20 {
                    return cx.throw_error("hash for file_contains needs to be 20 bytes.");
                }
                let nonce = &*byte_arr_property(cx, value, "nonce")?;
                if nonce.len() != 12 {
                    return cx.throw_error("nonce for file_contains needs to be 12 bytes.");
                }
                let tag = &*byte_arr_property(cx, value, "tag")?;
                if tag.len() != 16 {
                    return cx.throw_error("tag for file_contains needs to be 16 bytes.");
                }
                Ok(CheckType::FileContains {
                    file: property::<JsString>(cx, value, "file")?.value(),
                    /* safely unwrap because length is guaranteed to be 20 */
                    hash: <Ripemd160Hash>::try_from(hash_vec).unwrap(),
                    length: property::<JsNumber>(cx, value, "length")?.value() as usize,
                    message: byte_arr_property(cx, value, "message")?,
                    nonce: <AesNonce>::try_from(nonce).unwrap(),
                    tag: <AesTag>::try_from(tag).unwrap(),
                })
            },
            _ => Err(Throw)
        }
    }

    pub fn make_check(cx: &mut CallContext<JsUndefined>, value: &Handle<JsObject>) -> NeonResult<Check> {
        let type_name = &*property::<JsString>(cx, value, "type")?.value();
        Ok(Check {
            check_type: Check::get_type(type_name, cx, value)?,
            points: property::<JsNumber>(cx, value, "points")?.value() as isize
        })
    }

    pub fn maybe_cache_file(&self, fm: &mut FileManager) -> bool {
        match &self.check_type {
            CheckType::FileContains { file, length, .. } |
            CheckType::FileNotContain { file, length, .. } => {
                fm.cache_file(file, *length).unwrap();
                true
            },
            _ => false,
        }
    }
}