const configureFormatter = require('../../src/index');

const Lab = require('lab');
const lab = (exports.lab = Lab.script());
const { experiment, test, beforeEach, afterEach } = lab;

const sinon = require('sinon');
const assert = require('assert');
const clc = require('cli-color');

const log = {
  colorize: false,
  json: false,
  level: 'error',
  meta: {},
};

experiment('Formatter', () => {
  let sandbox;

  beforeEach(done => {
    sandbox = sinon.createSandbox();

    done();
  });

  afterEach(done => {
    sandbox.restore();

    done();
  });

  experiment('Stack trace', () => {
    test('stack as string', done => {
      const { formatter } = configureFormatter({ types: false, colors: false });
      const stack =
        'TypeError: undefined is not a function\n  ' +
        'at Object.<anonymous> (test.js)\n  ' +
        'at Module._compile (module.js:641:30)';

      sandbox.stub(log, 'meta').value({ stack });

      assert.equal(
        formatter(log),
        '[ERROR] No message\n  ' +
          'TypeError: undefined is not a function\n    ' +
          'at Object.<anonymous> (test.js)\n    ' +
          'at Module._compile (module.js:641:30)'
      );

      done();
    });

    test('stack as array', done => {
      const { formatter } = configureFormatter({ types: false, colors: false });
      const stack = [
        'TypeError: undefined is not a function',
        '  at Object.<anonymous> (test.js)',
        '  at Module._compile (module.js:641:30)',
      ];

      sandbox.stub(log, 'meta').value({ stack });

      assert.equal(
        formatter(log),
        '[ERROR] TypeError: undefined is not a function\n  ' +
          'TypeError: undefined is not a function\n    ' +
          'at Object.<anonymous> (test.js)\n    ' +
          'at Module._compile (module.js:641:30)'
      );

      done();
    });

    test('no stack trace if stackTrace=false', done => {
      const { formatter } = configureFormatter({
        types: false,
        colors: false,
        stackTrace: false,
      });
      const stack = [
        'TypeError: undefined is not a function',
        '  at Object.<anonymous> (test.js)',
        '  at Module._compile (module.js:641:30)',
      ];

      sandbox.stub(log, 'meta').value({ stack });

      assert.equal(
        formatter(log),
        '[ERROR] TypeError: undefined is not a function'
      );

      done();
    });
  });

  experiment('Meta', () => {
    test('no meta props if meta=false', done => {
      const { formatter } = configureFormatter({
        types: false,
        colors: false,
        meta: false,
      });

      sandbox.stub(log, 'meta').value({ one: 1, two: 2 });

      assert.equal(formatter(log), '[ERROR] No message');

      done();
    });
  });
});
