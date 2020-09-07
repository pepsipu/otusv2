mod crypto;
mod fs;

fn main() {
    let mut c = crypto::Crypto::new();
    let mut fs_manager = fs::FileManager::new();
    fs_manager.cache_file("Cargo.toml", &[18]);
    let x = fs_manager.file_contains("Cargo.toml", &c.hash(b"otus-engine-worker"), 18);
    println!("{:?}", x);
    fs_manager.update_cached_file("Cargo.toml", &[18]);
    let y = fs_manager.file_contains("Cargo.toml", &c.hash(b"otus-engine-worker"), 18);
    println!("{:?}", y);
}
