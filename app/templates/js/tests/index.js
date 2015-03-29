var expect = require('chai').expect;

var lib = require('../lib');

describe('<%= name %>', function() {
  it('Should return 1 after calling hello_rust', function() {
    expect(lib.helloRust('<%= name %>')).to.be.equal(1);
  });

  it('Should be able to get mutated input from hello_struct', function() {
    var obj = { msg: 'Hello Rust!' };
    lib.helloStruct(obj);
    console.log(obj.msg);
    expect(obj).to.deep.equal({ msg: 'Hello JS!' });
  });
});
