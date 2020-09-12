use neon::prelude::*;
use neon::*;

use crate::fs::FileManager;
use crate::vuln::Check;
use crate::bindings::js_helper::property;

pub struct SystemWatcher {
    fm: FileManager,
    checks: Vec<Check>
}

impl SystemWatcher {
    fn new(checks: Vec<Check>) -> SystemWatcher {
        SystemWatcher {
            checks,
            fm: FileManager::new(),
        }
    }

    fn cache_files(&mut self) {

    }
}

declare_types! {
    pub class JsSystemWatcher for SystemWatcher {
        init(mut cx) {
            /* we can't really interact with wrapped js values very easily so map them to something
            we can work with */
            let js_checks: Vec<Handle<JsValue>> = cx.argument::<JsArray>(0)?.to_vec(&mut cx)?;
            let mut checks: Vec<Check> = Vec::with_capacity(js_checks.len());
            /* can't map/match because we might need to raise err. this is ugly. i hate it. why the
            FUCK do i need keep everything in the same scope to throw an error??? someone please
            figure out how to do this properly because i have no clue. */
            for check in js_checks {
                let js_check = check.downcast_or_throw::<JsObject, CallContext<JsUndefined>>(&mut cx)?;
                let check_res = Check::make_check(&mut cx, &js_check);
                if let Ok(c) = check_res {
                    checks.push(c);
                } else if let Err(e) = check_res {
                    return Err(e);
                }
            }
            Ok(SystemWatcher::new(checks))
        }
    }
}