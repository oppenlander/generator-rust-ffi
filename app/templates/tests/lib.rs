extern crate <%= slugname %>;

use std::ffi::CStr;
use std::ffi::CString;

#[test]
fn hello_struct_test() {
    let msg = CString::new("Hello Rust!").unwrap().as_ptr();
    let h = <%= slugname %>::hello_t {
        msg: msg
    };
    <%= slugname %>::hello_struct(h);
    let buf = unsafe { CStr::from_ptr(h.msg).to_bytes() };
    let str_msg = String::from_utf8(buf.to_vec()).unwrap();
    assert_eq!("Hello JS!", str_msg);
}
