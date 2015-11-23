var clc = require('cli-color');

const defaults = {
  silly: 'blue',
  debug: 'cyan',
  info: 'green',
  warn: 'yellow',
  error: 'red',
  verbose: 'magenta'
};

class Colorizer {
  constructor (colors = defaults) {
    this._colors = colors;
  }

  colorByLevel (level = 'info') {
    var white = 'white';
    var color = this._colors[level] || white;

    return typeof clc[color] != 'undefined' ? color : white;
  }

  colorify (string, color) {
    return clc[color](string);
  }
}

module.exports = Colorizer;
