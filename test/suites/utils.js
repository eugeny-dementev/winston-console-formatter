var Lab = require('lab');
var lab = (exports.lab = Lab.script());
var { experiment, test } = lab;

var assert = require('assert');
var clc = require('cli-color');

var utils = require('../../src/utils');

exports.testObject = {
  colorize: false,
  json: false,
  level: 'error',
  message: "Uncaught TypeError: Cannot read property 'blya' of undefined",
  meta: {
    from: 'Server',
    array: [
      2,
      'two',
      {
        object: {
          emptyArray: [],
        },
      },
    ],
    object: {
      number: 200,
      bool: false,
      null: null,
      undefined: undefined, // eslint-disable-line no-undefined
    },
    stack:
      "TypeError: Cannot read property 'blya' of undefined\n    at <anonymous>:2:27",
    emptyObject: {},
  },
  showLevel: true,
  label: 'myapp',
  depth: null,
  align: false,
  humanReadableUnhandledException: false,
  timestamp: true,
};

const colors = {
  trace: 'blue',
  debug: 'cyan',
  info: 'green',
  warn: 'yellow',
  error: 'red',
  fatal: 'magenta',
};

experiment('Utils', () => {
  experiment('utils.getStackTrace with colors', () => {
    test('empty stack is empty string', done => {
      assert.equal(utils.getStackTrace('', true), '');

      done();
    });

    test('not empty stack is moved to the next line', done => {
      assert.equal(
        utils.getStackTrace('Error:', true),
        clc.magenta('\n  Error:')
      );

      done();
    });

    test('not empty stack every line break moved to right by 2 spaces', done => {
      assert.equal(
        utils.getStackTrace('Error:\n  at line', true),
        clc.magenta('\n  Error:\n    at line')
      );

      done();
    });
  });

  experiment('utils.getStackTrace without colors', () => {
    test('empty stack is empty string', done => {
      assert.equal(utils.getStackTrace(''), '');

      done();
    });

    test('not empty stack is moved to the next line', done => {
      assert.equal(utils.getStackTrace('Error:'), '\n  Error:');

      done();
    });

    test('not empty stack every line break moved to right by 2 spaces', done => {
      assert.equal(
        utils.getStackTrace('Error:\n  at line'),
        '\n  Error:\n    at line'
      );

      done();
    });
  });
});
