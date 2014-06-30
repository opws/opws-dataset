var yaml = require('js-yaml');
var fs = require('fs');
var queue = require('queue-async');
var glob = require('glob');

module.exports = function(grunt) {
  function buildDomainProfilesJson(next) {
    var json = grunt.config('json');
    glob('profiles/*/*.yaml', {cwd: __dirname}, function(err, matches) {
      if (err) return next(err);
      var domainprofiles = {};
      var q = queue();

      function readDomainProfile(filename, cb) {
        var names = /^profiles\/(.*)\/(.*)\.yaml$/.exec(filename);
        var domain = names[2] + '.' + names[1];

          fs.readFile(filename, 'utf8', function(err, content) {
            if (err) return next(err);
            domainprofiles[domain] = yaml.load(content, {filename: filename});
            cb();
          });
        }

      for (var i = 0; i < matches.length; i++) {
        q.defer(readDomainProfile, matches[i]);
      }

      q.awaitAll(function(err) {
        if (err) return next(err);
        fs.writeFile('domainprofiles.json',
          JSON.stringify(domainprofiles, null, json.space)+'\n', 'utf8', next);
      });
    });
  }

  function runThisDataAsync() {
    this.data(this.async());
  }

grunt.initConfig({
    json: {space: 2},
    build: {
      "domainprofiles.json": buildDomainProfilesJson
    }
  });

  grunt.registerMultiTask('build', 'Build composite files from source.',
    runThisDataAsync);
  grunt.registerTask('default', ['build']);
};
