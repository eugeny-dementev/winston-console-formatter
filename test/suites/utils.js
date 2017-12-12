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
  experiment('utils.getStackTrace', () => {
    test('empty stack, trace is empty string', (done) => {
      assert.equal(utils.getStackTrace(null, null), '');

      done();
    });

    test('empty stack array is empty string', (done) => {
      assert.equal(utils.getStackTrace([], null), '');

      done();
    });

    test('empty trace array is empty string', (done) => {
      assert.equal(utils.getStackTrace(null, []), '');
      
      done();
    });

    test('empty stack is empty string', done => {
      assert.equal(utils.getStackTrace(''), '');
  
      done();
    });

    test('not empty stack is moved to the next line', (done) => {
      assert.equal(
        utils.getStackTrace(['Error:'], null),
        clc.magenta('\n  Error:')
      );

      done();
    });
    test('not empty trace is moved to the next line', (done) => {
      const traces = [{
        function: null,
        file: '/path/to/file.js',
        line: 10,
        column: 20
      }];
      assert.equal(
        utils.getStackTrace(null, traces),
        clc.magenta('\n  at (/path/to/file.js:10:20)')
      );

      done();
    });

    test('not empty trace every line break moved to right by 2 spaces', (done) => {
      const traces = [{
        function: null,
        file: '/path/to/file.js',
        line: 10,
        column: 20
      }, {
        function: 'called.function',
        file: '/path/to/another/file.js',
        line: 30,
        column: 40
      }];
      assert.equal(
        utils.getStackTrace(null, traces),
        clc.magenta('\n  at (/path/to/file.js:10:20)\n    at called.function (/path/to/another/file.js:30:40)')
      );

      done();
    });

    test('not empty stack is moved to the next line', done => {
      assert.equal(utils.getStackTrace('Error:'), clc.magenta('\n  Error:'));

      done();
    });

    test('not empty stack every line break moved to right by 2 spaces', done => {
      assert.equal(
        utils.getStackTrace(['Error:', '  at line'], null),
        clc.magenta('\n  Error:\n    at line')
      );

      done();
    });
  });
});
