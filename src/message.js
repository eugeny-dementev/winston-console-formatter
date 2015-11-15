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

class Message {
  _message = 'No message';
  _timestamp = null;
  _level = 'info';
  _label = null;
  _from = null;

  /**
   * @param {boolean|function} message
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
      str += `${clc.white(this._from)} - `;
    }

    str += `${this._message}`;

    var color = colors[this._level];

    return clc[color](str);
  }
}

module.exports = Message;
