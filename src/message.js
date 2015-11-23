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
  setColorizer (colorizer) {
    this._colorizer = colorizer;

    return this;
  }

  colorify (string, color = null) {
    try {
      var clr = color || this._colorizer.colorByLevel(this._level);
      return this._colorizer.colorify(string, clr);
    } catch (e) {
      return string;
    }
  }

  /**
   * @param {string|undefined} message
   * @return {Message}
   */
  setMessage (message) {
    if (message) {
      this._message = message;
    }

    return this;
  }

  /**
   * @param {boolean|function} timestamp
   * @return {Message}
   */
  setTime (timestamp) {
    if (timestamp === true) {
      this._timestamp = utils.getISOTime();
    } else if (typeof timestamp === 'function') {
      this._timestamp = timestamp();
    }

    return this;
  }

  /**
   * @param {string|undefined} label
   * @return {Message}
   */
  setLabel (label) {
    if (label) {
      this._label = label;
    }

    return this;
  }

  /**
   * @param {string|undefined} level
   * @return {Message}
   */
  setLevel (level) {
    if (level) {
      this._level = level.toLowerCase();
    }

    return this;
  }

  /**
   * @param {string|undefined} from
   * @return {Message}
   */
  setFrom (from) {
    if (from) {
      this._from = from;
    }

    return this;
  }

  toString () {
    var str = '';

    if (this._timestamp) {
      str += `[${this._timestamp}] `;
    }

    if (this._label) {
      str += `${this._label} `;
    }

    str += `[${this._level.toUpperCase()}] `;

    if (this._from) {
      str += `${this.colorify(this._from, 'white')} - `;
    }

    str += `${this._message}`;

    return this.colorify(str);
  }
}

module.exports = Message;
