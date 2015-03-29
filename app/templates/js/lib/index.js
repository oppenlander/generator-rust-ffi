var FFI = require('ffi');
var fs = require('fs');
var path = require('path');
var ref = require('ref');
var Struct = require('ref-struct');

var libPath;
fs.readdirSync(path.resolve(__dirname, '../../target/release')).forEach(function(file) {
  if (/lib<%= slugname %>/.test(file)) {
    libPath = file;
  }
});

var HelloType = new Struct({
  msg: 'string'
});
var HelloTypePtr = ref.refType(HelloType);

var lib = FFI.Library(path.resolve(__dirname, '../../target/release', libPath), {
  'hello_rust': [ 'byte', [ 'string' ] ],
  'hello_struct': [ 'void', [ HelloTypePtr ] ]
});

module.exports = exports = {
  HelloType: HelloType,
  helloRust: lib.hello_rust,
  helloStruct: function(obj) {
    // Convert to C-style struct before passing
    var passable = new HelloType(obj);
    lib.hello_struct(passable.ref());
    for (var key in obj) {
      obj[key] = passable[key] || obj[key];
    }
  },
  lib: lib
};
