var utils = require('./utils');
var Message = require('./message');
var Colorizer = require('./colorizer');

function configuredFormatter ({ colors }) {
  /**
   * @param {Object} options
   * @return {string}
   */
  return function formatter (options) {
    var {
      meta,
      level,
      label,
      message,
      timestamp
      } = options;

    var {
      from,
      stack, trace,
      message: objectMessage
      } = meta;

    delete meta.from;
    delete meta.message;
    delete meta.stack;
    delete meta.trace;

    var formattedMessage = new Message()
      .setColorizer(new Colorizer(colors))
      .setTime(timestamp)
      .setLabel(label)
      .setLevel(level)
      .setFrom(from)
      .setMessage(message || objectMessage)
      .toString();

    formattedMessage += utils.getStackTrace(stack || trace);
    formattedMessage += utils.metaToYAML(meta);

    return formattedMessage;
  };
}

module.exports = {
  config (options = {}, config = {}) {
    return Object.assign({ timestamp: utils.getISOTime }, options, {
      formatter: configuredFormatter(config)
    });
  }
};
