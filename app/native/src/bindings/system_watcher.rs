use neon::prelude::*;
use neon::*;

use crate::fs::FileManager;
use crate::vuln::Check;
use crate::bindings::js_helper::property;
use std::fs::File;

#[derive(Clone)]
pub struct SystemWatcher {
    pub fm: FileManager,
    pub checks: Vec<Check>
}

impl SystemWatcher {
    pub fn new(checks: Vec<Check>) -> SystemWatcher {
        SystemWatcher {
            checks,
            fm: FileManager::new(),
        }
    }
}

declare_types! {
    pub class JsSystemWatcher for SystemWatcher {
        init(mut cx) {
            /* we can't really interact with wrapped js values very easily so map them to something
            we can work with */
            let js_checks: Vec<Handle<JsValue>> = cx.argument::<JsArray>(0)?.to_vec(&mut cx)?;
            let mut sys_watcher = SystemWatcher::new(Vec::with_capacity(js_checks.len()));
            /* can't map/match because we might need to raise err. this is ugly. i hate it. why the
            FUCK do i need keep everything in the same scope to throw an error??? someone please
            figure out how to do this properly because i have no clue. */
            for check_obj in js_checks {
                let js_check = check_obj.downcast_or_throw::<JsObject, CallContext<JsUndefined>>(&mut cx)?;
                let check_res = Check::make_check(&mut cx, &js_check);
                if let Ok(check) = check_res {
                    check.maybe_cache_file(&mut sys_watcher.fm);
                    sys_watcher.checks.push(check);
                } else if let Err(e) = check_res {
                    return Err(e);
                }
            }
            Ok(sys_watcher)
        }

        method runChecks(mut cx) {
            /* although i dont want to, we cant keep the guard in scope without borrowing it as
            immutable. as a result, we need to copy all of the system watcher over, make our
            changes, and copy it back.
            TODO: use refs to system watcher instead of copy back and forth without getting
             assaulted by the borrow checker
            rust gurus, this is your job. */
            let mut sys_watcher: SystemWatcher = {
                let this = cx.this();
                let guard = cx.lock();
                let sys_watcher = this.borrow(&guard);
                sys_watcher.clone()
            };
            let ret = JsArray::new(&mut cx, sys_watcher.checks.len() as u32);
            for (i, check) in (&sys_watcher.checks).iter().enumerate() {
                let (passed, message, pow) = check.is_passed(&mut sys_watcher.fm);
                let element = JsArray::new(&mut cx, 3);
                let points = cx.number(check.points as f64);
                element.set(&mut cx, 0, points);
                if passed {
                    /* [points, message, pow]. objects in neon are slowwww so we will use arrays
                    for now */
                    let js_message = cx.string(message);
                    element.set(&mut cx, 1, js_message);
                    let js_pow = cx.string(base64::encode(pow));
                    element.set(&mut cx, 2, js_pow);
                } else {
                    let null = cx.null();
                    element.set(&mut cx, 1, null);
                    element.set(&mut cx, 2, null);
                }
                ret.set(&mut cx, i as u32, element);
            }
            let mut this = cx.this();
            let guard = cx.lock();
            let mut sys_watcher_store = this.borrow_mut(&guard);
            sys_watcher_store.clone_from(&sys_watcher);
            Ok(ret.upcast())
        }
    }
}