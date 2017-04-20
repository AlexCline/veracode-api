var assert = require("assert"),
    Veracode = require("../index");

describe("Veracode", function(){
  describe("initialization", function(){
    it("should load the module successfully", function(){
      assert(Veracode);
    });
  });

  describe("#config", function(){
    var options = {
      api_user: 'admin',
      api_password: 'admin'
    },
    veracode = new Veracode();

    it("should accept a config object", function(){
      assert.ifError(veracode.config(options));
    });

    it("should return the current config object", function(){
      assert(veracode.config());
    });

    it("should accept optional config options", function(){
      var veracode = new Veracode();
      options.strictSSL = false;

    });

    it("should throw an error if a required attr is missing", function(){
      var veracode = new Veracode();
      delete options.api_password;
      assert.throws( function(){
        veracode.config(options);
      }, Error);
    });
  });
});