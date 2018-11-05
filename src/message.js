var utils = require('./utils');

class Message {
  _colorizer = null;
  _message = 'No message';
  _timestamp = null;
  _level = 'info';
  _label = null;
  _from = null;

  /**
   *
   * @param {Colorizer} colorizer
   */
  setColorizer(colorizer) {
    this._colorizer = colorizer;

    return this;
  }

  colorify(string, color = null) {
    try {
      var clr = color || this._colorizer.colorByLevel(this._level);
      return clr(string);
    } catch (e) {
      return string;
    }
  }

  /**
   * @param {string|undefined} message
   * @return {Message}
   */
  setMessage(message) {
    if (message) {
      this._message = message;
    }

    return this;
  }

  /**
   * @param {boolean|function} timestamp
   * @return {Message}
   */
  setTime(timestamp) {
    if (timestamp === true) {
      this._timestamp = utils.getISOTime();
    } else if (timestamp instanceof Date) {
      this._timestamp = utils.getISOTime(timestamp);
    } else if (typeof timestamp === 'function') {
      this._timestamp = timestamp();
    }

    return this;
  }

  /**
   * @param {string|undefined} label
   * @return {Message}
   */
  setLabel(label) {
    if (label) {
      this._label = label;
    }

    return this;
  }

  /**
   * @param {string|undefined} level
   * @return {Message}
   */
  setLevel(level) {
    if (level) {
      this._level = level.toLowerCase();
    }

    return this;
  }

  /**
   * @param {string|undefined} from
   * @return {Message}
   */
  setFrom(from) {
    if (from) {
      this._from = from;
    }

    return this;
  }

  toString() {
    var before = '';
    var from = '';
    var after = '';

    if (this._timestamp) {
      before += `[${this._timestamp}] `;
    }

    if (this._label) {
      before += `${this._label} `;
    }

    before += `[${this._level.toUpperCase()}] `;

    before = this.colorify(before);

    if (this._from) {
      from += `${this._from} `;
      after += '- ';
    }

    after += `${this._message}`;

    after = this.colorify(after);

    return before + from + after;
  }
}

module.exports = Message;
