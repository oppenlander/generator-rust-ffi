use std::ffi::CStr;
use std::ffi::CString;

#[no_mangle]
pub extern "C" fn hello_rust(name: *const i8) -> u8 {
    let buf = unsafe { CStr::from_ptr(name).to_bytes() };
    let str_name = String::from_utf8(buf.to_vec()).unwrap();
    println!("Hello {}!", str_name);
    1
}

#[repr(C)]
pub struct hello_t {
    pub msg: *const i8
}

#[no_mangle]
pub extern "C" fn hello_struct(obj: &mut hello_t) {
    let buf = unsafe { CStr::from_ptr(obj.msg).to_bytes() };
    let str_msg = String::from_utf8(buf.to_vec()).unwrap();
    println!("{}", str_msg);
    obj.msg = CString::new("Hello JS!").unwrap().as_ptr();
}
