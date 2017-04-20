const VC = require('./lib/veracode');
const pkg = require('./package');

exports = module.exports = function() {
  let veracode = new VC.Veracode();
  veracode.version = pkg.version;
  return veracode;
};
