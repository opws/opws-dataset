/*global describe it*/

var yaml = require('js-yaml');
var fs = require('fs');
var queue = require('queue-async');
var glob = require('glob');
var assert = require('assert');

describe('YAML files', function() {
  it('should be valid', function(next) {
    glob('yaml/*/*.yaml', {cwd: __dirname}, function(err, matches) {
      if (err) return next(err);
      var q = queue();

      function readDomainProfile(filename, cb) {
          fs.readFile(filename, 'utf8', function(err, content) {
            if (err) return next(err);
            yaml.load(content, {filename: filename});
            cb();
          });
        }

      for (var i = 0; i < matches.length; i++) {
        q.defer(readDomainProfile, matches[i]);
      }

      q.awaitAll(function(err) {
        if (err) return next(err);
        else next();
      });
    });
  });
  it('should follow correct naming conventions', function(next) {
    glob('yaml/**', {cwd: __dirname}, function(err, matches) {
      if (err) return next(err);
      
      for (var i = 0; i < matches.length; i++) {
        assert(/^yaml\/[a-z0-9\-\.]+\/[a-z0-9\-\.]+\.yaml$/.exec(matches[i]),
          matches[i] + ' does not fit the filename pattern for domain profiles');
      }

      next();
    });
  });
});
