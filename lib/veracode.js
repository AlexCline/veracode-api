const fs = require('fs');
const endpoints = fs.readdirSync([__dirname, 'endpoints'].join('/'));

exports.Veracode = function() {
  let veracode = {};

  // Set some defaults options
  veracode.options = {
    url: 'https://analysiscenter.veracode.com/api',
    strictSSL: true,
    rejectUnauthorized: true,
    json: true,
    timeout: 15000,
    headers: {
      'User-Agent': 'curl/7.37.1',
    },
  };

  veracode.config = function(options) {
    if(options == undefined) {
      return veracode.options;
    }

    const requireAttrs = ['api_user', 'api_password'];
    const optionalAttrs = Object.keys(veracode.options);

    requireAttrs.forEach(function(attr) {
      if(options[attr]) {
        veracode.options[attr] = options[attr];
      } else {
        throw new Error('A "' + attr + '" option is required');
      }
    });

    optionalAttrs.forEach(function(attr) {
      if(options[attr] != undefined) {
        delete veracode.options[attr];
        veracode.options[attr] = options[attr];
      }
    });
  };

  endpoints.forEach(function(file) {
    if(/\.js$/.test(file)) {
      const methods = require([__dirname, 'endpoints', file].join('/'))
          .methods(veracode.options);
      Object.keys(methods).forEach(function(methodName) {
        veracode[methodName] = methods[methodName];
      });
    }
  });

  return veracode;
};
