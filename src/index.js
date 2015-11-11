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
 * @param {Object} logObject
 * @param {function|boolean} time
 * @param {string} level
 * @param {string|undefined} optionsMessage
 * @param {string|undefined} label
 * @return {string}
 */
function formatter ({ meta: logObject, timestamp: time, level, message: optionsMessage, label }) {
  var meta = logObject || {};
  var timestamp = '';

  if (time === true) {
    timestamp = getISOTime();
  } else if (typeof time === 'function') {
    timestamp = time();
  } else {
    timestamp = 'no time';
  }

  var { from, message: objectMessage, stack, trace } = meta;

  delete meta.from;
  delete meta.message;
  delete meta.stack;
  delete meta.trace;

  var color = colors[level || 'info'];
  var LEVEL = level.toUpperCase();
  var message = optionsMessage || objectMessage || 'no message';

  var formattedMessage = clc[color](`[${timestamp}] ${label || ''} [${LEVEL}]`);

  if (from) {
    formattedMessage += ` ${clc.white(from)} -`;
  }

  formattedMessage += ` ${clc[color](message)}`;

  var stackTrace = utils.getStackTrace(stack, trace);
  if (stackTrace) {
    formattedMessage += stackTrace;
  }

  if (meta) {
    formattedMessage += clc.white(utils.objectProperty(meta));
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
