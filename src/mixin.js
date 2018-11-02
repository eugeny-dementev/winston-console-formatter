const MESSAGE = Symbol.for('message');
// eslint-disable-next-line import/no-extraneous-dependencies
const yamlifyObject = require('yamlify-object');
// eslint-disable-next-line import/no-extraneous-dependencies
const yamlifyColors = require('yamlify-object-colors');

const utils = require('./utils');
const Message = require('./message');
const Colorizer = require('./colorizer');
const defaultErrorColors = require('./colors');

function ColorizedMixin(instance, options = {}) {
  options = Object.assign({}, options, {
    prefix: '',
    postfix: '',
    stackTrace: true,
    colors: defaultErrorColors,
    types: yamlifyColors,
  });
  var oldLog = instance.log.bind(instance);
  instance.log = function log(info, callback) {
    var remainingInfo = Object.assign({}, info);
    delete remainingInfo.from;
    delete remainingInfo.stack;
    delete remainingInfo.trace;
    delete remainingInfo.message;
    delete remainingInfo.timestamp;
    delete remainingInfo.label;
    delete remainingInfo.level;

    let stackTraceRaw = info.stack || info.trace;
    let stackTraceJoined;
    let stackTraceMesssage;

    if (!info.message && Array.isArray(stackTraceRaw)) {
      stackTraceMesssage = stackTraceRaw[0];
    }

    if (Array.isArray(stackTraceRaw)) {
      stackTraceJoined = stackTraceRaw.join('\n');
    }

    let formattedMessage = new Message()
      .setColorizer(new Colorizer(info.colors || options.colors))
      .setTime(info.timestamp || options.timestamp)
      .setLabel(info.label || options.label)
      .setLevel(info.level || options.level)
      .setFrom(info.from)
      .setMessage(stackTraceMesssage || info.message)
      .toString();

    if (options.stackTrace) {
      formattedMessage += utils.getStackTrace(
        stackTraceJoined === undefined ? stackTraceRaw : stackTraceJoined,
        Boolean(options.colors)
      );
    }

    formattedMessage += yamlifyObject(remainingInfo, {
      colors: options.types,
      indent: '  ',
      prefix: '\n',
      postfix: '',
    });

    oldLog(
      Object.assign({}, info, {
        [MESSAGE]: `${options.prefix}${formattedMessage}${options.postfix}`,
      }),
      callback
    );
  };
  return instance;
}

module.exports = ColorizedMixin;
