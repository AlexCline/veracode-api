var assert = require("assert"),
    Veracode = require("../index"),
    testOptions = require("../secret/test");

var veracode = null;

describe("Builds", function(){
  before(function(done){
    veracode = new Veracode();
    veracode.config(testOptions);
    done();
  });

  // beforeEach(function(done){
  //   setTimeout(done, 2000);
  // });

  describe("#list", function(){
    it("should return a list of all builds", function(done){
      veracode.builds.list(302762, {}, function(err, list){
        // console.log(err || list);
        assert.ifError(err);
        assert(list);
        assert(list.length > 0);
        done();
      });
    });
  });

  describe("#info", function(){
    it("should return the info for a build", function(done){
      veracode.builds.info(302762, { buildId: 1293739 }, function(err, build){
        // console.log(err || build);
        assert.ifError(err);
        assert(build);
        done();
      });
    })
  });

});