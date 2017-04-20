var assert = require("assert"),
    Veracode = require("../index"),
    testOptions = require("../secret/test");

var veracode = null;

describe("Reports", function(){
  before(function(done){
    veracode = new Veracode();
    veracode.config(testOptions);
    done();
  });

  // beforeEach(function(done){
  //   setTimeout(done, 2000);
  // });

  describe("#summary", function(){
    it("should return a summary report of a build", function(done){
      veracode.reports.summary(1293739, function(err, summary){
        // console.log(err || summary)
        assert.ifError(err);
        assert(summary);
        done();
      });
    });
  });

  describe("#summaryPdf", function(){
    it("should return a summary pdf report of a build", function(done){
      veracode.reports.summaryPdf(1293739, "/tmp", function(err, summary){
        // console.log(err || summary)
        assert.ifError(err);
        assert(summary);
        done();
      });
    });
  });

  describe("#detail", function(){
    it("should return a detailed report of a build", function(done){
      veracode.reports.detail(1293739, function(err, detail){
        // console.log(err || detail)
        assert.ifError(err);
        assert(detail);
        done();
      });
    });
  });

  describe("#detailPdf", function(){
    it("should return a detailed pdf report of a build", function(done){
      veracode.reports.detailPdf(1293739, "/tmp", function(err, detail){
        // console.log(err || detail)
        assert.ifError(err);
        assert(detail);
        done();
      });
    });
  });

  // describe("#flaws", function(){
  //   it("should return a detailed flaw report for an app", function(done){
  //     veracode.reports.flaws(302762, {}, function(err, flaws){
  //       console.log(err || flaws)
  //       assert.ifError(err);
  //       assert(flaws);
  //       done();
  //     });
  //   });
  // });

  // describe("#info", function(){
  //   it("should return the info for a build", function(done){
  //     veracode.builds.info(293252, { build_id: 1212112 }, function(err, build){
  //       assert.ifError(err);
  //       assert(build);
  //       done();
  //     });
  //   })
  // });

});