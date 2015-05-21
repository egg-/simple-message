# simple-message 

[![version](https://img.shields.io/npm/v/simple-message.svg) ![download](https://img.shields.io/npm/dm/simple-message.svg)](https://www.npmjs.com/package/simple-message)

simple message handler.

## Install

```
npm install simple-message
```

## API

### message.error.get(key)

```javascript
var message = require('simple-message');

var error = message.error.get('common.missing_required_parameter');
```
```javascript
// console.log(error);

{
  type: 'common.missing_required_parameter',
  code: 400,
  message: 'The request is missing a required parameter.'
}
```

### message.load(key, value, [callback])

load by json object

```javascript
var message = require('simple-message');

message.load('error', {
  "common.missing_required_parameter": [
    400,
    "The request is missing a required parameter."
  ],
  "common.method_not_allowed": [
    400,
    "The API call is correct, but the method is not allowed."
  ],
  "common.unexpected_parameter": [
    400,
    "The request specifies an unexpected parameter."
  ],
  "common.invalid_json_string": [
    400,
    "Problems parsing JSON."
  ]
});
```

### message.load(key, url, [callback])

load by remote json file.

```javascript
var message = require('simple-message');

message.load('error', 'json format file url', function(err, item) {
  console.log(item['common.missing_required_parameter'][1], message.error.get('common.missing_required_parameter').message);
});
```

### message.loadYAML(key, url, [callback])

load by remote yaml file.

```javascript
message.loadYAML('error', 'yaml format file url', function(err, item) {
  console.log(item['common.missing_required_parameter'][1], message.error.get('common.missing_required_parameter').message);
});
```

## Sample file

* [error.json](sample/error.json)
* [error.yml](sample/error.yml)


## LICENSE

simple-message is licensed under the MIT license.