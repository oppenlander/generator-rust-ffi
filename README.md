# Rust FFI Generator

The Rust FFI generator is a generator for bootstraping [Rust](http://www.rust-lang.org/) libraries that expose Foreign Function Interface bindings into other languages (currently only NPM is supported).


## Usage
Install Yeoman (best when installed globally).
```bash
npm install -g yo
```

Install this generator.
```bash
npm install -g generator-rust-ffi
```

Create a folder for your project to live.
```bash
mkdir a-rust-lib && cd a-rust-lib
```

Finally, initiate the generator.
```bash
yo rust-ffi
```

## License
MIT
