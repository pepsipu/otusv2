use neon::prelude::*;
use base64::decode;

pub fn property<'a, T: Value>(cx: &'a mut CallContext<JsUndefined>, value: &Handle<JsObject>, key: &str) -> NeonResult<Handle<'a, T>> {
    Ok(value.get(cx, key)?.downcast_or_throw::<T, CallContext<JsUndefined>>(cx)?)
}

pub fn base64_str_prop(cx: &mut CallContext<JsUndefined>, value: &Handle<JsObject>, key: &str) -> NeonResult<Vec<u8>> {
    match decode(property::<JsString>(cx, value, key)?.value()) {
        Ok(v) => Ok(v),
        Err(e) => cx.throw_error(e.to_string())
    }
}