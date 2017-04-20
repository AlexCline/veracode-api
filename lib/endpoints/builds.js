exports.methods = function(config) {
  const http = require('../http').methods(config);

  return {
    builds: {
      list: function(appId, xtra, cb) {
        let opts = {'app_id': appId};
        if(xtra.sandboxId) {
          opts.sandbox_id = xtra.sandboxId;
        }

        http.post('/5.0/getbuildlist.do', [], opts, function(err, res) {
          return cb(err, res.buildlist.build);
        });
      },

      info: function(appId, xtra, cb) {
        let opts = {'app_id': appId};
        if(xtra.buildId) {
          opts.build_id = xtra.buildId;
        }
        if(xtra.sandboxId) {
          opts.sandbox_id = xtra.sandboxId;
        }

        http.post('/5.0/getbuildinfo.do', [], opts, function(err, res) {
          return cb(err, res.buildinfo.build);
        });
      },

      callstacks: function(buildId, flawId, cb) {
        let params = [
          'build_id=' + buildId,
          'flaw_id=' + flawId,
        ];
        http.get('/5.0/getcallstacks.do', params, function(err, res) {
          return cb(err, res.callstacks);
        });
      },
    },
  };
};
