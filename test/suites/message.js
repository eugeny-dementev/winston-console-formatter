var Message = require('../../src/message');
var Colorizer = require('../../src/colorizer');
var colors = require('../../src/colors');

var Lab = require('lab');
var lab = (exports.lab = Lab.script());
var { experiment, test } = lab;

var assert = require('assert');
var clc = require('cli-color');

experiment('Message.', () => {
  experiment('Defaults.', () => {
    test('message without message and level.', done => {
      var message = new Message();

      var str = message.toString();

      assert.equal(str, '[INFO] No message');

      done();
    });

    test('message with message but no level.', done => {
      var message = new Message();

      var str = message.setMessage('message').toString();

      assert.equal(str, '[INFO] message');

      done();
    });

    test('message without message but level.', done => {
      var message = new Message();

      var str = message.setLevel('error').toString();

      assert.equal(str, '[ERROR] No message');

      done();
    });
  });

  experiment('LowerCase', () => {
    test('eRrOr level lowerCased in Message.', done => {
      var message = new Message();

      message.setLevel('eRrOr');

      assert.equal(message._level, 'error');

      done();
    });
  });

  experiment('Time.', () => {
    test('Timestamp is function.', done => {
      var message = new Message();

      var str = message.setTime(() => 'time').toString();

      assert.equal(str, '[time] [INFO] No message');

      done();
    });

    test('Timestamp is boolean = true', done => {
      var message = new Message();

      var str = message.setTime(true).toString();

      // [2015-11-21 07:40:18.606]
      assert(/^\[\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d\]/.test(str));

      done();
    });

    test('Timestamp is boolean = false', done => {
      var message = new Message();

      var str = message.setTime(false).toString();

      assert.equal(str, '[INFO] No message');

      done();
    });
  });

  experiment('From.', () => {
    test('From is white in green info.', done => {
      var message = new Message();

      var str = message
        .setColorizer(new Colorizer(colors))
        .setFrom('client')
        .toString();

      var colored =
        clc.green(`[INFO] `) + 'client ' + clc.green(`- No message`);

      assert.equal(str, colored);

      done();
    });
  });

  experiment('Label.', () => {
    test('just label', done => {
      var message = new Message();

      var str = message.setLabel('label').toString();

      assert.equal(str, `label [INFO] No message`);

      done();
    });
  });

  experiment('Color.', () => {
    test('no Colorizer, no colors', done => {
      var message = new Message();

      assert.equal(message.colorify(`string`), `string`);

      done();
    });
  });

  experiment('Color.', () => {
    test('with Colorizer all is not colored by default in level color', done => {
      var message = new Message().setColorizer(new Colorizer());

      assert.equal(message.colorify(`string`), `string`);

      done();
    });
  });

  experiment('Chaining', () => {
    test('methods returns this', done => {
      var message = new Message();

      assert.equal(message, message.setColorizer(new Colorizer()));
      assert.equal(message, message.setLabel(''));
      assert.equal(message, message.setLevel(''));
      assert.equal(message, message.setFrom(''));
      assert.equal(message, message.setTime(false));
      assert.equal(message, message.setMessage(''));

      done();
    });
  });
});
