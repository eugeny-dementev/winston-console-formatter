var utils = require('./utils');
var Message = require('./message');

/**
 * @param {Object} options
 * @return {string}
 */
function formatter (options) {
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
    .setTime(timestamp)
    .setLabel(label)
    .setLevel(level)
    .setFrom(from)
    .setMessage(message || objectMessage)
    .toString();

  formattedMessage += utils.getStackTrace(stack || trace);
  formattedMessage += utils.metaToYAML(meta);

  return formattedMessage;
}

module.exports = {
  formatter,
  config (options = {}) {
    return Object.assign({ timestamp: utils.getISOTime }, options, { formatter });
  }
};
