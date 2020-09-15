use neon::prelude::*;
use neon::*;
use crate::bindings::system_watcher::JsSystemWatcher;
use crate::fs::FileManager;
use crate::vuln::Check;
use std::borrow::Borrow;

mod bindings;
mod crypto;
mod fs;
mod vuln;

/* unfortunately types need to be declared in lib.rs or you can't use some stuff */


register_module!(mut m, { m.export_class::<JsSystemWatcher>("SystemWatcher") });

// register_module!(mut m, { m.export_class::<JsSystemWatcher>("SystemWatcher") });