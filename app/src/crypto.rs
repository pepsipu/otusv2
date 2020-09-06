use crypto::digest::Digest;
use crypto::sha2::Sha256;

pub struct Crypto {
    sha256: Sha256,
}

impl Crypto {
    pub fn new() -> Crypto {
        Crypto {
            sha256: Sha256::new(),
        }
    }

    pub fn hash(&mut self, s: &[u8]) -> [u8; 32] {
        self.sha256.input(s);
        let mut res: [u8; 32] = [0; 32];
        self.sha256.result(&mut res);
        self.sha256.reset();
        res
    }

    /* given string S and the hash and length of substring H, return index of substring H.
    this requires len(S) - len(H) + 1 hashes, an O(n) solution. */
    pub fn contains(&mut self, s: &[u8], hash: &[u8], l: usize) -> isize {
        for i in 0..s.len() - l + 1 {
            if self.hash(&s[i..i + l]) == hash {
                return i as isize;
            }
        }
        return -1;
    }
}
