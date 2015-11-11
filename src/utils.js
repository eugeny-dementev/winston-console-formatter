var clc = require('cli-color');

/**
 * @param {string|undefined} stack
 * @param {string|undefined} trace
 * @returns {string}
 */
function getStackTrace (stack, trace) {
  var stackTrace = stack || trace || '';

  if (stackTrace.length === 0) {
    return stackTrace;
  }

  return clc.magenta(`\n  ${stackTrace.replace(/(\r\n|\n|\r)/gm, '$1  ')}`);
}

/**
 * Object to yaml string formatter
 *
 * @param {Object} obj
 * @param {number} [indent=1]
 * @returns {string}
 */
function objectProperty (obj = {}, indent = 1) {
  if (Object.keys(obj).length === 0) {
    return '';
  }

  var str = '\n';
  var prefix = getPrefix(indent);

  Object.keys(obj).forEach((name) => {
    var value = obj[name];
    str += `${prefix}${clc.white(name)}: ${typifiedString(value, indent + 1)}\n`;
  });

  return str.substring(0, str.length - 1);
}

/**
 * Array to yaml string formatter
 *
 * @param {Array} values
 * @param {number} [indent=1]
 * @return {string}
 */
function arrayProperty (values, indent = 1) {
  if (values.length <= 0) {
    return '';
  }

  var str = '\n';
  var prefix = getPrefix(indent);

  values.forEach((value) => {
    str += `${prefix}- ${typifiedString(value, indent + 1).trim()}\n`;
  });

  return str.substring(0, str.length - 1);
}

function typifiedString (value, indent) {
  switch (valueType(value)) {
    case 'array':
      return arrayProperty(value, indent);
    case 'object':
      return objectProperty(value, indent);
    case 'string':
      return clc.green(value);
    case 'number':
      return clc.yellow(value);
    case 'boolean':
      return clc.cyan(value);
    default:
      return '';
  }
}

function valueType (value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  return typeof value;
}

function getPrefix (indent = 1) {
  var prefix = '';
  for (let i = 0; i < indent; i++) {
    prefix += '  ';
  }

  return prefix;
}

exports.getStackTrace = getStackTrace;
exports.arrayProperty = arrayProperty;
exports.objectProperty = objectProperty;
exports.typifiedString = typifiedString;
exports.valueType = valueType;
