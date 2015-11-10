var Lab = require('lab');
var lab = exports.lab = Lab.script();
var { experiment, test } = lab;

var assert = require('assert');

var utils = require('../../src/utils');


const testObject = {
  'colorize': false,
  'json': false,
  'level': 'error',
  'message': '',
  'meta': {
    array: [2, 4,
      'one', 'two', 'three', {
        ohelel: { bloo: [] },
        helel: 'good'
      }
    ],
    'codeHttp': 200,
    'codeMeta': 400,
    'method': 'POST',
    'message': 'ApiError: Parameter \'email\' is required',
    'error': { 'type': 'paramIsRequired', 'message': 'Parameter \'email\' is required' },
    'apiUrl': 'http://auth.stage.persona.test/1.0/login?email=undefinedpassword=undefined',
    'apiParams': {},
    'stack': 'Error\n    at BrowserLogger.error (http://127.0.0.1:3000/public/bundle.js:83383:51)\n    at API._logApiResponseError (http://127.0.0.1:3000/public/bundle.js:83153:22)\n    at wrapper (http://127.0.0.1:3000/public/bundle.js:50053:19)\n    at run (http://127.0.0.1:3000/public/bundle.js:30124:39)\n    at http://127.0.0.1:3000/public/bundle.js:30135:28\n    at MutationObserver.flush (http://127.0.0.1:3000/public/bundle.js:29590:13)',
    'from': 'Client Error',
    'userHRef': 'http://127.0.0.1:3000/login',
    'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
    '_ip': '::ffff:127.0.0.1',
    'type': 'gelf-bizcat'
  },
  'showLevel': true,
  'prettyPrint': false,
  'raw': false,
  'label': 'catberry',
  'logstash': false,
  'depth': null,
  'align': false,
  'humanReadableUnhandledException': false,
  timestamp: getISOTime
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
