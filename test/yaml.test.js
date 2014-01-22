/*global describe it*/

var yaml = require('js-yaml');
var fs = require('fs');
var glob = require('glob');
var assert = require('assert');

describe('YAML file', function() {
  glob.sync('profiles/*/*', {cwd: __dirname + '/..'})
    .forEach(function(filename) { describe(filename, function() {
      
      it('should follow correct naming conventions', function() {
        assert(/^profiles\/[a-z0-9\-\.]+\/[a-z0-9\-\.]+\.yaml$/.exec(filename),
          filename + ' does not fit the filename pattern for domain profiles');
      });
      
      it('should be valid', function(done) {
        fs.readFile(filename, 'utf8', function(err, content) {
          if (err) return done(err);
          yaml.load(content, {filename: filename});
          done();
        });
      });
      
    });
  });
});
