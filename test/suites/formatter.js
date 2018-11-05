var consoleFormatter = require('../../src/formatter');

var Lab = require('lab');
var lab = (exports.lab = Lab.script());
var { beforeEach, afterEach, experiment, test } = lab;

var assert = require('assert');
const sinon = require('sinon');
var winston = require('winston');
var _oldLog = console.log.bind(console);

experiment('Formatter.', () => {
  beforeEach(done => {
    sinon.spy(console._stdout, 'write');
    done();
  });
  afterEach(done => {
    console._stdout.write.restore();
    done();
  });
  test('Logging in right format', done => {
    var logger = winston.createLogger({
      level: 'silly',
      transports: [
        new winston.transports.Console({
          format: consoleFormatter(),
        }),
      ],
    });
    logger.info('Test String', { timestamp: new Date(2018, 10, 10, 0, 1, 2) });
    var calledWith = console._stdout.write.getCalls().map(c => c.args);

    assert.equal(calledWith.length, 1);
    assert.equal(calledWith[0].length, 1);
    assert.equal(
      calledWith[0][0],
      '\u001b[32m[2018-11-10 08:01:02.000] [INFO] \u001b[39m\u001b[32mTest String\u001b[39m\n'
    );
    done();
  });
});
