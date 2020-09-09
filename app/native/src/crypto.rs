use crypto::bcrypt::bcrypt;

const BCRYPT_COST: u32 = 1;
/* TODO: maybe generate a salt for each image?
for now, using this will just prevent usage of preexisting tables so it's ok */
const BCRYPT_SALT: &[u8] = b"otus_salt1234567";

pub type BcryptHash = [u8; 24];

pub fn hash(s: &[u8]) -> BcryptHash {
    let mut res: BcryptHash = [0; 24];
    bcrypt(BCRYPT_COST, BCRYPT_SALT, s, &mut res);
    res
}

/* given string S and the hash and length of substring H, return index of substring H.
this requires len(S) - len(H) + 1 hashes, an O(n) solution. */
pub fn contains(s_hashes: &Vec<BcryptHash>, hash: &[u8]) -> Option<usize> {
    s_hashes.iter().position(|&h| hash == h)
}

pub fn compute_hashes(s: &[u8], l: usize) -> Vec<BcryptHash> {
    let hashes_to_compute = s.len() - l + 1;
    let mut hashes: Vec<BcryptHash> = Vec::with_capacity(hashes_to_compute);
    for i in 0..hashes_to_compute {
        hashes.push(hash(&s[i..i + l]));
    }
    hashes
}

