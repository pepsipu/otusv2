use neon::prelude::*;
use neon::*;

use crate::fs::FileManager;

pub struct SystemWatcher {
    fm: FileManager,
}

impl SystemWatcher {
    fn new() -> SystemWatcher {
        SystemWatcher {
            fm: FileManager::new(),
        }
    }
}

declare_types! {
    pub class JsSystemWatcher for SystemWatcher {
        init(mut cx) {
            Ok(SystemWatcher::new())
        }
    }
}
