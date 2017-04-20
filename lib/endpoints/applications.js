exports.methods = function(config) {
  const http = require('../http').methods(config);

  return {
    applications: {
      list: function(cb) {
        http.get('/5.0/getapplist.do', [], function(err, res) {
          return cb(err, res.applist.app);
        });
      },

      info: function(appId, cb) {
        http.post('/5.0/getappinfo.do', [], {'app_id': appId},
          function(err, res) {
            return cb(err, res.appinfo.application);
          });
      },

      builds: function(xtra, cb) {
        let opts = {};
        const fields = [
          'report_changed_since',
          'only_latest',
          'include_in_progress',
        ];

        fields.forEach(function(field) {
          if(xtra[field]) {
            opts[field] = xtra[field];
          }
        });

        http.post('/4.0/getappbuilds.do', [], opts, function(err, res) {
          return cb(err, res.applicationbuilds.application);
        });
      },
    },
  };
};
