
use neon::prelude::*;

mod bindings;
mod crypto;
mod fs;
mod vuln;

fn test(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("gaming"))
}

register_module!(mut cx, {
    cx.export_function("test", test);
    cx.export_class::<bindings::system_watcher::JsSystemWatcher>("SystemWatcher")?;
    Ok(())
});