use neon::prelude::*;

use crate::fs::FileManager;

pub struct SystemWatcher {
    fm: FileManager,
}

