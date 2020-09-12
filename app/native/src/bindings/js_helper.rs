use neon::prelude::*;

pub fn property<'a, T: Value>(cx: &'a mut CallContext<JsUndefined>, value: &Handle<JsObject>, key: &str) -> NeonResult<Handle<'a, T>> {
    Ok(value.get(cx, key)?.downcast_or_throw::<T, CallContext<JsUndefined>>(cx)?)
}

pub fn byte_arr_property(cx: &mut CallContext<JsUndefined>, value: &Handle<JsObject>, key: &str) -> NeonResult<Vec<u8>> {
    Ok(property::<JsArray>(cx, value, key)?.to_vec(cx).unwrap().iter().map(|x| {
        x.downcast_or_throw::<JsNumber, CallContext<JsUndefined>>(cx).unwrap().value() as u8
    }).collect::<Vec<u8>>())
}