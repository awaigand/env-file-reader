# env-file-reader

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)[![Build Status](https://travis-ci.com/awaigand/env-file-reader.svg?branch=master)](https://travis-ci.com/awaigand/env-file-reader)

A simple script for reading (Docker) .env files into a JSON Object 

## Install

Use [npm](https://npmjs.com/) to install.

```sh
npm install env-file-reader --save
```

## Usage

[![NPM](https://nodei.co/npm/env-file-reader.png)](https://www.npmjs.com/package/env-file-reader)

You can use this package for parsing .env files, regularly used by Docker containers, into a JSON Object. You could, for example, read out the env file to use it in your local non-docker testing by replacing it in some file during built.

### Example

```env
#dev.env
VAR_1=my first var
VAR_2=my second var $VAR_3
VAR_3=is cool
```

```js
var parseEnvFile = require('env-file-reader').parse;
var envs = parseEnvFile('dev.env');
/*
    envs.VAR_1:"my first var",
    envs.VAR_2:"my second var is cool",
    envs.VAR_3:"is cool"
*/
```

### API

#### parse(filepath, options = {exclude:[], delimiter:['$','']})

Parses the `filepath` env file. `options` is optional. Not all options have to be set. 
- `exclude` is an array of strings. It excludes the given variables from the returned object. They will be resolved if you reference them in other environment variables. 
- `delimiter` is an array of two strings. All variables for recursive replacement are searched like `delimiter[0]+name+delimiter[1]`. `['$','']` is the default, since docker uses it that way. 

#### parseString(filecontent, options = {exclude:[], delimiter:['$','']})
Same as `parse`, but takes the file content instead of a file path. 

## License

MIT, see [LICENSE.md](http://github.com/awaigand/env-file-reader/blob/master/LICENSE.md) for details.
