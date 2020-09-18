use super::*;
use crate::bindings::system_watcher::SystemWatcher;
use crate::vuln::CheckType;
use crate::crypto::{aes_encrypt, sha256_hash, ripemd160_hash};
#[test]
fn file_contains_correct() -> Result<(), String> {
    let answer = b"ANSWER: 2";
    let hash = ripemd160_hash(answer);
    println!("answer hash: {}", hex::encode(&hash));
    let aes_key = sha256_hash(&ripemd160_hash(&sha256_hash(answer)));
    println!("message encryption key: {}", hex::encode(&aes_key));
    let (message, tag, nonce) = aes_encrypt(
        &b"scored! the amount of cats was 2.".to_vec(),
        &aes_key,
    );
    println!("aes nonce: {}, aes tag: {}, aes encoded message: {}", hex::encode(&nonce), hex::encode(&tag), hex::encode(&message));
    let file = "tests/file_contains/forensics_1_correct".to_string();
    let mut sys_watcher = SystemWatcher::new(vec![
        Check { points: 10, check_type: CheckType::FileContains {
            hash,
            message,
            tag,
            nonce,
            file: file.clone(),
            length: answer.len(),
        }},
    ]);
    sys_watcher.fm.cache_file(&file, answer.len());
    let (passed, decoded_message) = sys_watcher.checks[0].is_passed(&mut sys_watcher.fm);
    if passed {
        match decoded_message {
            Some(m) => {
                match String::from_utf8(m) {
                    Ok(s) => {
                        println!("decoded message: {}", s);
                        Ok(())
                    }
                    Err(e) => Err(format!("could not decode message: {}", e))
                }
            },
            None => Err(String::from("passed check but couldn't decode message"))
        }
    } else {
        Err(String::from("file contain failed because ????"))
    }
}

#[test]
fn file_contains_incorrect() -> Result<(), String> {
    let answer = b"ANSWER: 2";
    let hash = ripemd160_hash(answer);
    println!("answer hash: {}", hex::encode(&hash));
    let aes_key = sha256_hash(&ripemd160_hash(&sha256_hash(answer)));
    println!("message encryption key: {}", hex::encode(&aes_key));
    let (message, tag, nonce) = aes_encrypt(
        &b"scored! the amount of cats was 2.".to_vec(),
        &aes_key,
    );
    println!("aes nonce: {}, aes tag: {}, aes encoded message: {}", hex::encode(&nonce), hex::encode(&tag), hex::encode(&message));
    let file = "tests/file_contains/forensics_1_incorrect".to_string();
    let mut sys_watcher = SystemWatcher::new(vec![
        Check { points: 10, check_type: CheckType::FileContains {
            hash,
            message,
            tag,
            nonce,
            file: file.clone(),
            length: answer.len(),
        }},
    ]);
    sys_watcher.fm.cache_file(&file, answer.len());
    let (passed, decoded_message) = sys_watcher.checks[0].is_passed(&mut sys_watcher.fm);
    if !passed {
        Ok(())
    } else {
        Err(String::from("check passed but it shouldnt??"))
    }
}