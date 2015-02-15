/*global describe it*/

var yaml = require('js-yaml');
var fs = require('fs');
var glob = require('glob');
var assert = require('assert');

var documentedFields = new Object(null);

(function populateDocumentedFields() {
  var $ = require('cheerio').load(
    require('marked')(fs.readFileSync('docs/fields.md','utf8')));

  $('h2').each(function(i, elem) {
    var fields = $(elem).text().split(/,? +/g);
    for (var i = 0; i < fields.length; i++) {
      documentedFields[fields[i]] = true;
    }
  });
})();

function validateDocumentedFields(doc) {
  function checkKeys(prefix, obj) {
    var keys = Object.keys(obj);
    for (var i=0; i < keys.length; i++) {
      var key = keys[i];
      var path = prefix + key;
      var val = obj[key];
      if (typeof(val) == 'object' && val != null && !Array.isArray(val)
        && path != 'username.rules') {
        checkKeys(path + '.', val);
      } else {
        if (!documentedFields[path])
          throw new Error(path + ' is not documented');
      }
    }
  }
  checkKeys('', doc);
}

describe('YAML file', function() {
  glob.sync('profiles/*/*', {cwd: __dirname + '/..'})
    .forEach(function(filename) { describe(filename, function() {

      it('should follow correct naming conventions', function() {
        assert(/^profiles\/[a-z0-9\-\.]+\/[a-z0-9\-\.]+\.yaml$/.exec(filename),
          filename + ' does not fit the filename pattern for domain profiles');
      });

      it('should be valid YAML including only documented fields',
        function(done) {
          fs.readFile(filename, 'utf8', function(err, content) {
            if (err) return done(err);
            validateDocumentedFields(yaml.load(content, {filename: filename}));
            done();
          });
      });

    });
  });
});
