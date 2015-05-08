# simple-message

## Usage

```javascript

var message = require('simple-message');

// case 1
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

console.log(message.error.get('common.missing_required_parameter'));


// case 2
message.load('error', 'http://madsquare.github.io/tosq/resource/error.json', function(err, item) {
  console.log(item['common.missing_required_parameter'][1], message.error.get('common.missing_required_parameter').message);
});

```

## LICENSE

simple-message is licensed under the MIT license.