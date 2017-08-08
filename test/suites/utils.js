var Lab = require('lab');
var lab = exports.lab = Lab.script();
var { experiment, test } = lab;

var assert = require('assert');
var clc = require('cli-color');

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
  experiment('Prefix.', () => {
    test('default prefix is two spaces.', (done) => {
      var prefix = utils.getPrefix();

      assert.equal(prefix, '  ');

      done();
    });

    test('indent = 2', (done) => {
      var prefix = utils.getPrefix(2);

      assert.equal(prefix, '    ');

      done();
    });
  });

  experiment('utils.objectProperty', () => {
    test('empty object with indent = 1.', (done) => {
      var str = utils.objectProperty({});

      assert.equal(str, '');

      done();
    });

    test('empty object with indent > 1.', (done) => {
      var str = utils.objectProperty({}, 2);

      assert.equal(str, '{}');

      done();
    });

    test('with props string start with \\n', (done) => {
      var str = utils.objectProperty({ h: 'h' });

      assert.equal(str[0], '\n');

      done();
    });

    test('with props object string is colored', (done) => {
      var str = utils.objectProperty({ h: 'h' });

      assert.equal(str, `\n  h: ${clc.green('h')}`);

      done();
    });
  });

  experiment('utils.arrayProperty', () => {
    test('empty array with indent = 1.', (done) => {
      var str = utils.arrayProperty([]);

      assert.equal(str, '');

      done();
    });

    test('empty array with indent > 1.', (done) => {
      var str = utils.arrayProperty([], 2);

      assert.equal(str, '[]');

      done();
    });

    test('with elems string start with \\n', (done) => {
      var str = utils.arrayProperty([1]);

      assert.equal(str[0], '\n');

      done();
    });

    test('with props object string is colored', (done) => {
      var str = utils.arrayProperty([1]);

      assert.equal(str, `\n  - ${clc.yellow('1')}`);

      done();
    });
  });

  experiment('utils.typeOf', () => {
    test('typeOf null', (done) => {
      assert.equal(utils.typeOf(null), 'null');

      done();
    });

    test('typeOf undefined', (done) => {
      assert.equal(utils.typeOf(undefined), 'undefined');

      done();
    });

    test('typeOf number', (done) => {
      assert.equal(utils.typeOf(4), 'number');

      done();
    });

    test('typeOf object', (done) => {
      assert.equal(utils.typeOf({}), 'object');

      done();
    });

    test('typeOf array', (done) => {
      assert.equal(utils.typeOf([]), 'array');

      done();
    });

    test('typeOf string', (done) => {
      assert.equal(utils.typeOf(''), 'string');

      done();
    });

    test('typeOf boolean', (done) => {
      assert.equal(utils.typeOf(false), 'boolean');

      done();
    });
  });

  experiment('utils.typifiedString', () => {
    test('typifiedString null', (done) => {
      assert.equal(utils.typifiedString(null), clc.magenta.bold('null'));

      done();
    });

    test('typifiedString undefined', (done) => {
      assert.equal(utils.typifiedString(undefined), clc.magenta.bold('undefined'));

      done();
    });

    test('typifiedString number', (done) => {
      assert.equal(utils.typifiedString(4), clc.yellow(4));

      done();
    });

    test('typifiedString object', (done) => {
      assert.equal(utils.typifiedString({ h: 'h' }), utils.objectProperty({ h: 'h' }));

      done();
    });

    test('typifiedString array', (done) => {
      assert.equal(utils.typifiedString([1]), utils.arrayProperty([1]));

      done();
    });

    test('typifiedString string', (done) => {
      assert.equal(utils.typifiedString(''), clc.green(''));

      done();
    });

    test('typifiedString boolean', (done) => {
      assert.equal(utils.typifiedString(false), clc.yellow.bold(false));

      done();
    });
  });

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

    test('not empty stack every line break moved to right by 2 spaces', (done) => {
      assert.equal(
        utils.getStackTrace(['Error:', '  at line'], null),
        clc.magenta('\n  Error:\n    at line')
      );

      done();
    });
  });

  experiment('utils.metaToYAML', () => {
    test('no meta to empty string', (done) => {
      assert.equal(utils.metaToYAML(), '');

      done();
    });
    test('meta is empty object to empty string', (done) => {
      assert.equal(utils.metaToYAML({}), '');

      done();
    });
    test('meta is not empty object to white utils.objectProperty', (done) => {
      assert.equal(utils.metaToYAML({ h: 'h' }), utils.objectProperty({ h: 'h' }));

      done();
    });
  });
});
