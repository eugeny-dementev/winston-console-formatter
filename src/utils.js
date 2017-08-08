var clc = require('cli-color');

/**
 * @param {string|undefined} stackTrace
 * @returns {string}
 */
function getStackTrace (stack, trace) {
  let msg;
  if (stack && stack.length) {
    msg = '\n  ' + stack.join('\n  ');
  }
  else if (trace && trace.length) {
    const lines = trace.map((i) => {
      const fnString = i.function ? `${i.function} ` : '';
      return `at ${fnString}(${i.file}:${i.line}:${i.column})`;
    });
    msg = '\n  ' + lines.join('\n    ');
  }
  return msg ? clc.magenta(msg) : '';
}

/**
 * Object to yaml string formatter
 *
 * @param {Object} obj
 * @param {number} [indent=1]
 * @returns {string}
 */
function objectProperty (obj, indent = 1) {
  if (Object.keys(obj).length === 0) {
    return indent === 1 ? '' : '{}';
  }

  var str = '\n';
  var prefix = getPrefix(indent);

  Object.keys(obj).forEach((name) => {
    var value = obj[name];
    str += `${prefix}${name}: ${typifiedString(value, indent + 1)}\n`;
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
    return indent === 1 ? '' : '[]';
  }

  var str = '\n';
  var prefix = getPrefix(indent);

  values.forEach((value) => {
    str += `${prefix}- ${typifiedString(value, indent + 1).trim()}\n`;
  });

  return str.substring(0, str.length - 1);
}

function typifiedString (value, indent) {
  switch (typeOf(value)) {
    case 'array':
      return arrayProperty(value, indent);
    case 'object':
      return objectProperty(value, indent);
    case 'string':
      return clc.green(value);
    case 'number':
      return clc.yellow(value);
    case 'boolean':
      return clc.yellow.bold(value);
    case 'null':
      return clc.magenta.bold('null');
    case 'undefined':
      return clc.magenta.bold('undefined');
  }
}

function typeOf (value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (!value && typeof value === 'object') {
    return 'null';
  }

  return typeof value;
}

var prefixes = {};
function getPrefix (indent = 1) {
  if (prefixes[indent]) {
    return prefixes[indent];
  }

  var prefix = '';
  for (let i = 0; i < indent; i++) {
    prefix += '  ';
  }

  return (prefixes[indent] = prefix);
}

function metaToYAML (meta) {
  if (!meta || Object.keys(meta).length <= 0) {
    return '';
  }

  return objectProperty(meta);
}

/**
 * @return {string} - iso formatted time string
 */
function getISOTime () {
  var now = new Date().toISOString().split('T').join(' ');

  return now.substring(0, now.length - 1);
}

exports.getStackTrace = getStackTrace;
exports.arrayProperty = arrayProperty;
exports.objectProperty = objectProperty;
exports.typifiedString = typifiedString;
exports.getISOTime = getISOTime;
exports.metaToYAML = metaToYAML;
exports.getPrefix = getPrefix;
exports.typeOf = typeOf;
