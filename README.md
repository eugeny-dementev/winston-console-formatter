# Winston console formatter

[![Build Status][travis-img]][travis-url]
[![Code Coverage][codecov-img]][codecov-url]

Pretty print console formatter in yaml like style

## Install

```
npm install winston-console-formatter
```

This is custom config for default winston console transform.

## Usage

```js
const winston = require('winston');
const wcf = require('winston-console-formatter');

const logger = new winston.Logger({
  level: 'silly',
});

const { formatter, timestamp } = wcf();

logger.add(winston.transports.Console, {
  formatter,
  timestamp,
});

logger.log('error', 'message');
logger.log('warn', 'message');
logger.log('info', 'message');
logger.log('verbose', 'message');
logger.log('debug', 'message');
logger.log('silly', 'message');
```

## API

### wcf.config(options)

#### options

Type: `Object`

##### options.types

Type colors configuration for yamlify-object package<br> Default:

```js
wcf({
  types: require('yamlify-object-colors'),
});
```

![Meta object example](/log.png?raw=true "Types example")

##### options.colors

Message colors by log levels<br> Default:

```js
const clc = require('cli-color');

wcf({
  colors: {
    silly: clc.blue,
    debug: clc.cyan,
    info: clc.green,
    warn: clc.yellow,
    error: clc.red,
    verbose: clc.magenta,
  },
});
```

![Levels color](/winston.png?raw=true "Types example")

[travis-img]: https://travis-ci.org/eugeny-dementev/winston-console-formatter.svg?branch=master
[travis-url]: https://travis-ci.org/eugeny-dementev/winston-console-formatter
[codecov-img]: https://codecov.io/github/eugeny-dementev/winston-console-formatter/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/eugeny-dementev/winston-console-formatter?branch=master
