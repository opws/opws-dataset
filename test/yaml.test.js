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

function isLeafType(val) {
  return typeof val == 'string' || typeof val == 'boolean' ||
    typeof val == 'number' || val == null || Array.isArray(val) ||
    val instanceof Date;
}

function validateDocumentedFields(doc,done) {
  var failures = [];
  function checkKeys(prefix, obj) {
    var keys = Object.keys(obj);
    for (var i=0; i < keys.length; i++) {
      var key = keys[i];
      var path = prefix + key;
      var val = obj[key];

      // if this is one of the types we expect to be documented,
      // and there's no heading for a section documenting it
      if (isLeafType(val) && !documentedFields.test(path)) {
        //note that it was a failure
        failures.push(path);
      // otherwise, if this is an object
      } else if (typeof(val) == 'object') {
        // recurse into it
        checkKeys(path + '.', val);
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
