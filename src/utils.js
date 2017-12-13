var clc = require('cli-color');

/**
 * @param {[strings...]|undefined} stack
 * @param {[callbacks...]|undefined}
 * @returns {string}
 */
function getStackTrace (stack, trace) {
  let msg;
  if (stack && stack.length) {
    msg = '\n  ' + stack.join('\n  ');
  } else if (trace && trace.length) {
    const lines = trace.map((i) => {
      const fnString = i.function ? `${i.function} ` : '';
      return `at ${fnString}(${i.file}:${i.line}:${i.column})`;
    });
    msg = '\n  ' + lines.join('\n    ');
  }
  return msg ? clc.magenta(msg) : '';
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
