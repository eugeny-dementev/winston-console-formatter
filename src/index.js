const yamlifyObject = require('yamlify-object');
const yamlifyColors = require('yamlify-object-colors');

const utils = require('./utils');
const Message = require('./message');
const Colorizer = require('./colorizer');
const defaultErrorColors = require('./colors');

function configuredFormatter({
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

    let formattedMessage = new Message()
      .setColorizer(new Colorizer(colors))
      .setTime(timestamp)
      .setLabel(label)
      .setLevel(level)
      .setFrom(from)
      .setMessage(message || objectMessage)
      .toString();

    if (stackTrace) {
      formattedMessage += utils.getStackTrace(stack || trace, Boolean(colors));
    }

    if (props) {
      formattedMessage += yamlifyObject(meta, {
        colors: types,
        indent: '  ',
      });
    }

    return formattedMessage;
  };
}

module.exports = function config(options = {}) {
  return {
    timestamp: utils.getISOTime,
    formatter: configuredFormatter(options),
  };
};
