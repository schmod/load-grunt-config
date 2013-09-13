var path = require('path');
module.exports = function(grunt, options) {

  var defaults = {
    configPath: 'grunt',
    init: true,
    config: {}
  };

  options = grunt.util._.extend({}, defaults, options);

  var glob = require('glob');
  var object = {};
  var key;
  var cwd = process.cwd();

  glob.sync('*', {cwd: options.configPath}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    var fullPath = path.join(cwd, options.configPath, option);
    object[key] = require(fullPath);
  });

  object.package = grunt.file.readJSON(path.join(cwd, 'package.json'));
  object.env = process.env;

  require('load-grunt-tasks')(grunt);

  if (options.init) {
    grunt.initConfig(object);
  }

  return object;

};