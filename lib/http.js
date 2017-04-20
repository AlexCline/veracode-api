const fs = require('fs');
const request = require('request');
const parseString = require('xml2js').parseString;

exports.methods = function(config) {
  return {
    configure: function() {
      let opts = JSON.parse(JSON.stringify(config));
      opts.auth = {
        'user': opts.api_user,
        'pass': opts.api_password,
      };
      delete opts.api_user;
      delete opts.api_password;
      return opts;
    },

    get: function(path, params, cb) {
      let opts = this.configure();

      opts.method = 'GET';
      opts.url = config.url + path;
      if(params.length > 0)
        opts.url += '?' + params.join('&');
      opts.json = true;

      this.doRequest(opts, cb);
    },

    post: function(path, params, data, cb) {
      let opts = this.configure();

      opts.method = 'POST';
      opts.url = config.url + path;
      if(params.length > 0)
        opts.url += '?' + params.join('&');
      opts.formData = data;

      this.doRequest(opts, cb);
    },

    put: function(path, params, data, cb) {
      let opts = this.configure();

      opts.method = 'PUT';
      opts.url = config.url + path;
      if(params.length > 0)
        opts.url += '?' + params.join('&');
      opts.json = data;

      this.doRequest(opts, cb);
    },

    del: function(path, params, cb) {
      let opts = this.configure();

      opts.method = 'DELETE';
      opts.url = config.url + path;
      if(params.length > 0)
        opts.url += '?' + params.join('&');
      opts.json = true;

      this.doRequest(opts, cb);
    },

    download: function(path, params, dest, cb) {
      let opts = this.configure();

      opts.method = 'GET';
      opts.url = config.url + path;
      if(params.length > 0)
        opts.url += '?' + params.join('&');
      opts.json = true;

      let filename = '';
      let req = request.get(opts)
          .on('response', function(res) {
            filename = res.headers['content-disposition'].split('; ')[1]
                          .split('=')[1] || 'unknown-file-name';
            res.pipe(fs.createWriteStream([dest, filename].join('/')));
          })
          .on('error', cb)
          .on('end', function() {
            cb(null, [dest, filename].join('/'));
          });

      return req;
    },

    doRequest: function(opts, cb) {
      request(opts, function(err, res, body) {
        body = body || {};
        parseString(body, {mergeAttrs: true}, function(parseErr, result) {
          return cb(err || parseErr || result.error, result);
        });
      });
    },

  };
};
