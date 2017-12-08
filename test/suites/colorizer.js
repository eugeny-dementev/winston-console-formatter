var Colorizer = require('../../src/colorizer');

var Lab = require('lab');
var lab = (exports.lab = Lab.script());
var { experiment, test } = lab;

var assert = require('assert');

experiment('Colorizer.', () => {
  experiment('Colorify string', () => {
    test('colorify must send error if color not found', done => {
      var colorizer = new Colorizer();

      assert.throws(() => {
        colorizer.colorify('', 'hjkas234iodf4390u34289hiufriougr');
      }, TypeError);

      done();
    });
  });
});
