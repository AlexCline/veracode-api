var assert = require("assert"),
    Veracode = require("../index"),
    testOptions = require("../secret/test");

var veracode = null;

describe("Applications", function(){
  before(function(done){
    veracode = new Veracode();
    veracode.config(testOptions);
    done();
  });

  // beforeEach(function(done){
  //   setTimeout(done, 2000);
  // });

  describe("#list", function(){
    it("should return a list of all applications", function(done){
      veracode.applications.list(function(err, list){
        // console.log(err || list);
        assert.ifError(err);
        assert(list);
        assert(list.length > 0);
        done();
      });
    });
  });

  describe("#info", function(){
    it("should return the info for an application", function(done){
      veracode.applications.info(302762, function(err, app){
        // console.log(err || app);
        assert.ifError(err);
        assert(app);
        done();
      });
    })
  });

  describe("#builds", function(){
    it("should return the details for an application", function(done){
      veracode.applications.builds({}, function(err, builds){
        // console.log(err || builds);
        assert.ifError(err);
        assert(builds);
        done();
      });
    })
  });
});