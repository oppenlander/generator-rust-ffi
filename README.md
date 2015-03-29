# Rust FFI Generator

The Rust FFI generator is a yeoman generator for bootstraping [Rust](http://www.rust-lang.org/) libraries that expose Foreign Function Interface bindings for other languages (currently only NPM is supported).

This project was inspired by [Zbigniew Siciarz's blog post on calling Rust from other languages](https://siciarz.net/24-days-of-rust-calling-rust-from-other-languages/).

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
