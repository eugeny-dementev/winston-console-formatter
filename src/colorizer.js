const clc = require('cli-color');

const defaults = {
  silly: clc.blue,
  debug: clc.cyan,
  info: clc.green,
  warn: clc.yellow,
  error: clc.red,
  verbose: clc.magenta,
};

class Colorizer {
  constructor(colors = defaults) {
    this._colors = colors || {};
  }

  colorByLevel(level = 'info') {
    const colorify = this._colors[level];

    return typeof colorify === 'function' ? colorify : noColor;
  }
}

module.exports = Colorizer;

function noColor(string) {
  return string;
}
