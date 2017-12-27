class Colorizer {
  constructor(colors = {}) {
    this._colors = colors;
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
