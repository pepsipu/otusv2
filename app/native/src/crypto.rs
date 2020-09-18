use lazy_static::lazy_static;
use crypto::sha2::Sha256;
use crypto::ripemd160::Ripemd160;
use crypto::digest::Digest;
use std::sync::{Mutex, Arc};
use crypto::aes_gcm::AesGcm;
use crypto::aes::KeySize::KeySize256;
use crypto::aead::{AeadDecryptor, AeadEncryptor};
use rand::{Rng, RngCore};

/* TODO: maybe generate a salt for each image?
for now, using this will just prevent usage of preexisting tables so it's ok. maybe we could even
have a per vuln and per client nonce for extra security? */
const RIPEMD160_SALT: &[u8] = b"otus_salt!";

pub type Ripemd160Hash = [u8; 20];
pub type Sha256Hash = [u8; 32];
pub type AesNonce = [u8; 12];
pub type AesTag = [u8; 16];

/* js is async! to prevent input/res race conditions we will need to use a mutex for our
sha256/ripemd160 singletons. wrap in arc so we can have atomic operations for reference counting
so we can avoid granting ownership to more than one thread */
lazy_static! {
    static ref SHA256: Arc<Mutex<Sha256>> = Arc::new(Mutex::new(Sha256::new()));
}

lazy_static! {
    static ref RIPEMD160: Arc<Mutex<Ripemd160>> = Arc::new(Mutex::new(Ripemd160::new()));
}

/* ripemd160 is a perfect pick for calculating all these hashes! not only is it relatively small
 without slicing, it isn't as easy to brute as sha256. still, it's fast enough to calculate JIT. */
pub fn ripemd160_hash(s: &[u8]) -> Ripemd160Hash {
    /* allocing memory to concat the input and salt is expensive. keep a stack buffer as a
    tiny optimization to prevent needing to use heap. we can always fall back to heap if our stack
    buffer is too tiny. a little premature optimizationish imo, but does save us some time. if
    someone can find a better solution (maybe use a smallvec?) that would be great. */
    let mut salted_buffer: [u8; 512] = [0; 512];
    let mut res: Ripemd160Hash = [0; 20];
    let mut ripemd160 = RIPEMD160.lock().unwrap();
    let needed_size = s.len() + RIPEMD160_SALT.len();
    if needed_size > salted_buffer.len() {
        let mut heap_salted_buffer = Vec::with_capacity(needed_size);
        heap_salted_buffer.extend_from_slice(RIPEMD160_SALT);
        heap_salted_buffer.extend_from_slice(s);
        ripemd160.input(&*heap_salted_buffer);
    } else {
        salted_buffer[..RIPEMD160_SALT.len()].copy_from_slice(RIPEMD160_SALT);
        salted_buffer[RIPEMD160_SALT.len()..needed_size].copy_from_slice(s);
        ripemd160.input(&salted_buffer[..needed_size]);
    }
    ripemd160.result(&mut res);
    ripemd160.reset();
    res
}

/* sha256 is used when we really don't care much about security/when an alternative is needed to
ripemd160. try to use ripemd160 when you can. */
pub fn sha256_hash(s: &[u8]) -> Sha256Hash {
    let mut res: Sha256Hash = [0; 32];
    let mut sha256 = SHA256.lock().unwrap();
    sha256.input(s);
    sha256.result(&mut res);
    sha256.reset();
    res
}

/* given string S and the hash and length of substring H, return index of substring H.
this requires len(S) - len(H) + 1 hashes, an O(n) solution. */
pub fn contains(s_hashes: &Vec<Ripemd160Hash>, hash: &[u8]) -> Option<usize> {
    s_hashes.iter().position(|&h| hash == h)
}

pub fn compute_hashes(s: &[u8], l: usize) -> Vec<Ripemd160Hash> {
    let hashes_to_compute = s.len() - l + 1;
    let mut hashes: Vec<Ripemd160Hash> = Vec::with_capacity(hashes_to_compute);
    for i in 0..hashes_to_compute {
        hashes.push(ripemd160_hash(&s[i..i + l]));
    }
    hashes
}

pub fn aes_decrypt(cipher_text: &Vec<u8>, key: &[u8; 32], nonce: &AesNonce, tag: &AesTag) -> Vec<u8> {
    let mut plain_text = vec![0; cipher_text.len()];
    let mut aes_gcm = AesGcm::new(KeySize256, key, nonce, &[]);
    aes_gcm.decrypt(cipher_text, &mut *plain_text, tag);
    return plain_text;
}

/* this isnt really needed except for client side testing */
pub fn aes_encrypt(plain_text: &Vec<u8>, key: &[u8; 32]) -> (Vec<u8>, AesTag, AesNonce) {
    let mut cipher_text: Vec<u8> = vec![0; plain_text.len()];
    /* DOES IT LOOK LIKE I GIVE A GOD DAMN FUCK i aint no piss baby
    unsafe is ok here because contents are not used so no uninitialized + it is reserved.
    if ur a piss baby you can initialize ciphertext for O(n) memset speed sacrifice

    update: i am a piss baby and im scared of uninitialized data so will leave the unsafe code
    commented until i regain my confidence */
    /* let mut cipher_text: Vec<u8> = Vec::with_capacity(plain_text.len());
    unsafe { cipher_text.set_len(plain_text.len()) }; */
    let mut nonce: AesNonce = [0; 12];
    let mut tag: AesTag = [0; 16];
    /* kind of insecure but doesn't matter for security purposes */
    rand::thread_rng().fill_bytes(&mut nonce);
    let mut aes_gcm = AesGcm::new(KeySize256, key, &nonce, &[]);
    aes_gcm.encrypt(plain_text, &mut cipher_text, &mut tag);
    (cipher_text, tag, nonce)
}