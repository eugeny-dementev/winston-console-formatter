var clc = require('cli-color');
var utils = require('./utils');

const colors = {
  trace: 'blue',
  debug: 'cyan',
  info: 'green',
  warn: 'yellow',
  error: 'red',
  fatal: 'magenta'
};

/**
 * @param {Object} meta
 * @param {function} timestamp
 * @param {string} level
 * @param {string|undefined} optionsMessage
 * @param {string|undefined} label
 *
 * @return {string}
 */
function formatter ({ meta, timestamp, level, message: optionsMessage, label }) {
  var { from, message: objectMessage, stack, trace } = meta;

  delete meta.from;
  delete meta.message;
  delete meta.stack;
  delete meta.trace;

  var color = colors[level];
  var LEVEL = level.toUpperCase();
  var message = optionsMessage || objectMessage;

  var formattedMessage = clc[color](`[${timestamp()}] ${label} [${LEVEL}] ${from} - ${message}`);

  var stackTrace = utils.getStackTrace(stack, trace);
  if (stackTrace) {
    formattedMessage += stackTrace;
  }

  var formattedMeta = clc.white(utils.objectProperty({ meta }));
  if (formattedMeta) {
    formattedMessage += formattedMeta;
  }

  return formattedMessage;
}

/**
 * @return {string} - iso formatted time string
 */
function getISOTime () {
  var now = new Date().toISOString().split('T').join(' ');

  return now.substring(0, now.length - 1);
}

module.exports = {
  formatter,
  config (options = {}) {
    return Object.assign({ timestamp: getISOTime }, options, { formatter });
  }
};
