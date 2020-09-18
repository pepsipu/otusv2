#![allow(dead_code)]
#![allow(unused_imports)]
#![allow(unused_variables)]

use neon::prelude::*;
use neon::*;
use crate::bindings::system_watcher::JsSystemWatcher;
use crate::fs::FileManager;
use crate::vuln::Check;
use hex::encode;

mod bindings;
mod crypto;
mod fs;
mod vuln;

#[cfg(test)]
mod test;

register_module!(mut m, { m.export_class::<JsSystemWatcher>("SystemWatcher") });