var Colorizer = require('../../src/colorizer');

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var { experiment, test } = lab;

var assert = require('assert');

experiment('Colorizer.', () => {
  experiment('Defaults.', () => {
    test('info level by default.', (done) => {
      var colorizer = new Colorizer();

      assert.equal(colorizer.colorByLevel(), 'green');

      done();
    });

    test('white for any unknown level.', (done) => {
      var colorizer = new Colorizer();

      assert.equal(colorizer.colorByLevel('unknownLevel'), 'white');

      done();
    });

    test('custom colors.', (done) => {
      var colorizer = new Colorizer({
        knownLevel: 'red'
      });

      assert.equal(colorizer.colorByLevel('knownLevel'), 'red');

      done();
    });
  });

  experiment('Custom.', () => {
    test('if not existed custom color then white', (done) => {
      var colorizer:Colorizer = new Colorizer({ error: 'malinovyi' });

      assert.equal(colorizer.colorByLevel('error'), 'white');

      done();
    });
  });

  experiment('Colorify string', () => {
    test('colorify must send error if color not found', (done) => {
      var colorizer = new Colorizer();

      assert.throws(() => {
        colorizer.colorify('', 'hjkas234iodf4390u34289hiufriougr');
      }, TypeError);

      done();
    });
  });
});
