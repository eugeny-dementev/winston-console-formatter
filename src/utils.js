var clc = require('cli-color');

/**
 * @param {string|undefined} stackTrace
 * @returns {string}
 */
function getStackTrace(stackTrace) {
  if (!stackTrace) {
    return '';
  }

  return clc.magenta(`\n  ${stackTrace.replace(/(\r\n|\n|\r)/gm, '$1  ')}`);
}

/**
 * @return {string} - iso formatted time string
 */
function getISOTime() {
  var now = new Date()
    .toISOString()
    .split('T')
    .join(' ');

  return now.substring(0, now.length - 1);
}

exports.getStackTrace = getStackTrace;
exports.getISOTime = getISOTime;
