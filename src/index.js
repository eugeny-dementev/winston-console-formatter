const yamlifyObject = require('yamlify-object');
const yamlifyColors = require('yamlify-object-colors');

const utils = require('./utils');
const Message = require('./message');
const Colorizer = require('./colorizer');
const defaultErrorColors = require('./colors');

function configuredFormatter({
  postfix = '',
  prefix = '',
  stackTrace = true,
  meta: props = true,
  colors = defaultErrorColors,
  types = yamlifyColors,
}) {
  /**
   * @param {Object} options
   * @return {string}
   */
  return function formatter(options) {
    const { meta, level, label, message, timestamp } = options;

    const { from, stack, trace, message: objectMessage } = meta;

    delete meta.from;
    delete meta.message;
    delete meta.stack;
    delete meta.trace;

    let stackTrace;
    let stackTraceMesssage;

    if (!(message || objectMessage) && Array.isArray(stack)) {
      stackTraceMesssage = stack[0];
    }

    if (Array.isArray(stack)) {
      stackTrace = stack.join('\n');
    }

    let formattedMessage = new Message()
      .setColorizer(new Colorizer(colors))
      .setTime(timestamp)
      .setLabel(label)
      .setLevel(level)
      .setFrom(from)
      .setMessage(stackTraceMesssage || message || objectMessage)
      .toString();

    if (stackTrace) {
      formattedMessage += utils.getStackTrace(
        stackTrace || stack || trace,
        Boolean(colors)
      );
    }

    if (props) {
      formattedMessage += yamlifyObject(meta, {
        colors: types,
        indent: '  ',
        prefix: '\n',
        postfix: '',
      });
    }

    return `${prefix}${formattedMessage}${postfix}`;
  };
}

module.exports = function config(options = {}) {
  return {
    timestamp: utils.getISOTime,
    formatter: configuredFormatter(options),
  };
};
