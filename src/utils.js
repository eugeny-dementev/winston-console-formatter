var clc = require('cli-color');

/**
 * @param {string|undefined} stackTrace
 * @returns {string}
 */
function getStackTrace(stackTrace, colors) {
  if (!stackTrace) {
    return '';
  }

  const trace = `\n  ${stackTrace.replace(/(\r\n|\n|\r)/gm, '$1  ')}`;

  return colors ? clc.magenta(trace) : trace;
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
