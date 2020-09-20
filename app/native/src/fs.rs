use crate::crypto;
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufReader, Read, Result};

#[derive(Debug, Clone)]
struct FileData {
    hashes: HashMap<usize, Vec<crypto::Ripemd160Hash>>,
    file_hash: crypto::Sha256Hash,
    file: Vec<u8>,
}

#[derive(Debug, Clone)]
pub struct FileManager {
    file_cache: HashMap<String, FileData>,
}

impl FileManager {
    pub fn new() -> FileManager {
        FileManager {
            file_cache: HashMap::new(),
        }
    }

    pub fn cache_file(&mut self, file_name: &String, length: usize) -> Result<()> {
        let file_buf = std::fs::read(file_name)?;
        let mut file_data = FileData {
            hashes: HashMap::new(),
            file_hash: crypto::sha256_hash(&*file_buf),
            file: file_buf,
        };
        let hashes = crypto::compute_hashes(&file_data.file, length);
        file_data.hashes.insert(length, hashes);
        self.file_cache.insert(file_name.clone(), file_data);
        Ok(())
    }

    /* we should check against the file hash to make sure we aren't rehashing an unchanged file
    TODO: rehash after changed point and if change is a multiple of length, just rehash segment */
    pub fn update_cached_file(&mut self, file_name: &String, length: usize) -> Result<bool> {
        let file_buf = std::fs::read(file_name)?;
        let mut cache = self.file_cache.get_mut(file_name).unwrap();
        let new_cache_hash = crypto::sha256_hash(&file_buf);
        if new_cache_hash == cache.file_hash {
            /* no changes were made to the file, don't update cache */
            return Ok(false);
        }
        cache.file_hash = new_cache_hash;
        let hashes = crypto::compute_hashes(&*file_buf, length);
        cache.hashes.insert(length, hashes);
        Ok(true)
    }

    pub fn file_contains(&mut self, file_name: &str, hash: &[u8], l: usize) -> Option<usize> {
        let file = self.file_cache.get(file_name).unwrap();
        crypto::contains(file.hashes.get(&l).unwrap(), hash)
    }

    pub fn plain_at_idx(&self,  file: &String, idx: usize, length: usize) -> Vec<u8> {
        self.file_cache.get(file).unwrap().file[idx..idx + length].to_vec()
    }
}
