const clc = require('cli-color');

const defaults = {
  silly: clc.blue,
  debug: clc.cyan,
  info: clc.green,
  warn: clc.yellow,
  error: clc.red,
  verbose: clc.magenta,
};

module.exports = defaults;
