var Lab = require('lab');
var lab = exports.lab = Lab.script();
var { experiment, test } = lab;

var assert = require('assert');

var utils = require('../../src/utils');

exports.testObject = {
  colorize: false,
  json: false,
  level: 'error',
  message: 'Uncaught TypeError: Cannot read property \'blya\' of undefined',
  meta: {
    from: 'Server',
    array: [
      2,
      'two',
      {
        object: {
          emptyArray: []
        }
      }
    ],
    object: {
      number: 200,
      bool: false,
      null: null,
      undefined: undefined // eslint-disable-line no-undefined
    },
    stack: 'TypeError: Cannot read property \'blya\' of undefined\n    at <anonymous>:2:27',
    emptyObject: {}

  },
  showLevel: true,
  label: 'myapp',
  depth: null,
  align: false,
  humanReadableUnhandledException: false,
  timestamp: true
};

const colors = {
  trace: 'blue',
  debug: 'cyan',
  info: 'green',
  warn: 'yellow',
  error: 'red',
  fatal: 'magenta'
};

experiment('Utils', () => {
  test('Simple test', (done) => {
    assert(utils);
    done();
  });
});
