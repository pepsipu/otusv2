use crypto::digest::Digest;
use crypto::sha2::Sha256;
use std::fmt::{Debug, Display, Formatter};
use neon::prelude::*;

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
    pub fn contains(&mut self, s_hashes: &Vec<[u8; 32]>, hash: &[u8]) -> Option<usize> {
        s_hashes.iter().position(|&h| hash == h)
    }

    pub fn compute_hashes(&mut self, s: &[u8], l: usize) -> Vec<[u8; 32]> {
        let hashes_to_compute = s.len() - l + 1;
        let mut hashes: Vec<[u8; 32]> = Vec::with_capacity(hashes_to_compute);
        for i in 0..hashes_to_compute {
            hashes.push(self.hash(&s[i..i + l]));
        }
        hashes
    }
}

impl Debug for Crypto {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), std::fmt::Error> {
        Ok(())
    }
}

