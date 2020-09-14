use lazy_static::lazy_static;
use crypto::sha2::Sha256;
use crypto::ripemd160::Ripemd160;
use crypto::digest::Digest;
use std::sync::{Mutex, Arc};

/* TODO: maybe generate a salt for each image?
for now, using this will just prevent usage of preexisting tables so it's ok */
const RIPEMD160_SALT: &[u8] = b"otus_salt!";

pub type Ripemd160Hash = [u8; 20];
pub type Sha256Hash = [u8; 32];

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
    buffer is too tiny. a little premature optimizationish imo, but does save use some time. */
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
ripemd160. */
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