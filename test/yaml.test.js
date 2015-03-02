/*global describe it*/

var yaml = require('js-yaml');
var fs = require('fs');
var glob = require('glob');
var assert = require('assert');

// start documentedFields as an array of regex components
var documentedFields = [];
(function populateDocumentedFields() {
  var $ = require('cheerio').load(
    require('marked')(fs.readFileSync('docs/fields.md','utf8')));

  $('h2').each(function(i, elem) {
    // Push each header's component of the overall regex
    documentedFields.push($(elem).text()
      .replace(/\./g,'\\.')
      .replace(/[\*]/g,'.*')
      .replace(/,? +/g,'|'));
  });
})();
// Convert documentedFields to a regular expression
documentedFields = new RegExp('^('+documentedFields.join('|')+')$');

function validateDocumentedFields(doc,done) {
  var failures = [];
  function checkKeys(prefix, obj) {
    var keys = Object.keys(obj);
    for (var i=0; i < keys.length; i++) {
      var key = keys[i];
      var path = prefix + key;
      var val = obj[key];

      // if this is an object (that isn't a value like null or an array)
      if (typeof(val) == 'object'
        && val != null && !Array.isArray(val)) {
        // recurse into it
        checkKeys(path + '.', val);
      // if this is one of our end value types
      } else {
        // if it's not documented, list it as unrecognized
        if (!documentedFields.test(path)) failures.push(path);
      }
    }
  }
  checkKeys('', doc);
  if (failures.length != 0) done(new Error(failures.length == 1?
    failures[0] + ' is not documented' :
    'The following fields are not documented: \n- ' + failures.join('\n- ')));
    else done();
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
            validateDocumentedFields(yaml.load(content, {filename: filename}),
            done);
          });
      });

    });
  });
});
