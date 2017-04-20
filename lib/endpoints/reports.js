exports.methods = function(config) {
  const http = require('../http').methods(config);

  return {
    reports: {
      summary: function(buildId, cb) {
        http.get('/4.0/summaryreport.do', ['build_id='+buildId],
          function(err, res) {
            return cb(err, res.summaryreport);
          });
      },

      summaryPdf: function(buildId, path, cb) {
        http.download('/4.0/summaryreportpdf.do', ['build_id='+buildId],
          path, cb);
      },

      detail: function(buildId, cb) {
        http.get('/5.0/detailedreport.do', ['build_id='+buildId],
          function(err, res) {
            return cb(err, res.detailedreport);
          });
      },

      detailPdf: function(buildId, path, cb) {
        http.download('/4.0/detailedreportpdf.do', ['build_id='+buildId],
          path, cb);
      },

      // This doesn't seem to be working. The downloadflawreport
      // action returns an empty response body
      // flaws: function(app_id_list, xtra, cb) {
      //   var opts = { 'app_id_list': app_id_list };
      //   if(xtra.scan_type) { opts.scan_type = xtra.scan_type }

      //   http.post('/3.0/generateflawreport.do', [], opts,
      //     function(err, res) {
      //       if(err) { return cb(err); }
      //       http.get('/3.0/downloadflawreport.do',
      //         ['token='+res.archerreport.token], function(err, res) {
      //           return cb(err, res);
      //         });
      //     });
      // }

    },
  };
};
