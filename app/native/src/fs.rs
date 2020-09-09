use crate::crypto;
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufReader, Read, Result};

#[derive(Debug)]
struct FileHash {
    hashes: HashMap<usize, Vec<crypto::BcryptHash>>,
    file_hash: crypto::BcryptHash,
}

#[derive(Debug)]
pub struct FileManager {
    file_cache: HashMap<&'static str, FileHash>,
}

impl FileManager {
    pub fn new() -> FileManager {
        FileManager {
            file_cache: HashMap::new(),
        }
    }

    pub fn cache_file(&mut self, file_name: &'static str, lengths: &[usize]) -> Result<()> {
        let file_buf = std::fs::read(file_name)?;
        let mut file_hashes = FileHash {
            hashes: HashMap::new(),
            file_hash: crypto::hash(&*file_buf),
        };
        for length in lengths {
            let hashes = crypto::compute_hashes(&*file_buf, *length);
            file_hashes.hashes.insert(*length, hashes);
        }
        self.file_cache.insert(file_name, file_hashes);
        Ok(())
    }

    /* we should check against the file hash to make sure we aren't rehashing an unchanged file
    TODO: rehash after changed point and if change is a multiple of length, just rehash segment */
    pub fn update_cached_file(&mut self, file_name: &str, lengths: &[usize]) -> Result<()> {
        let file_buf = std::fs::read(file_name)?;
        let mut cache = self.file_cache.get_mut(file_name).unwrap();
        let new_cache_hash = crypto::hash(&*file_buf);
        if new_cache_hash == cache.file_hash {
            /* no changes were made to the file, don't update cache */
            return Ok(());
        }
        cache.file_hash = new_cache_hash;
        for length in lengths {
            let hashes = crypto::compute_hashes(&*file_buf, *length);
            cache.hashes.insert(*length, hashes);
        }
        Ok(())
    }

    pub fn file_contains(&mut self, file_name: &str, hash: &[u8], l: usize) -> Option<usize> {
        let file = self.file_cache.get(file_name).unwrap();
        crypto::contains(file.hashes.get(&l).unwrap(), hash)
    }
}
