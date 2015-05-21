/**
 * message.js: message handler
 *
 * @version 0.0.1
 * @author egg <i@egg.pe.kr>
 */

'use strict';

var pool = {
	error: {}
};

/**
 * @namespace message.error
 */
var error = {
	/**
	 * return error object
	 * @memberOf message.error
	 * @param {string | message~ERROR} err error type or error object.
	 * @return {message~ERROR}
	 */
	get: function(err) {
		if (typeof err === 'string') {
			if (typeof pool.error[err] === 'undefined') {
				pool.error[err] = [
					500, 'unkown error type.'
				];
			}

			err = {
				type: err,
				code: pool.error[err][0],
				message: pool.error[err][1]
			};
		}

		return err;
	}
};

/**
 * load message pool
 * @param {string} key `error`
 * @param {object | string} message message objects or url
 * @param {Function} [cb] callback function
 * @param {string} [format] file data format (default: `json`) `json` or `yaml`
 */
var loadData = function(key, message, cb, format) {
	if (typeof pool[key] === 'undefined') {
		throw new Error('not support type.');
	}

	if (typeof cb === 'undefined') {
		cb = function(err) {};
	}

	if (typeof message === 'string') {
		var request = require('request');
		request(message, function(err, res, body) {
			if (err) {
				return cb(err);
			}

			if (format === 'json') {
				pool[key] = JSON.parse(body);
			} else if (format === 'yaml') {
				pool[key] = require('js-yaml').safeLoad(body);
			} else {
				throw new Error('not support format.');
			}

			cb(null, pool[key]);
		});
	} else {
		pool[key] = message;
		cb(null, message);
	}
};

/**
 * @namespace message
 */
module.exports = {
	/**
	 * load message pool.
	 * @param {string} key `error`
	 * @param {object | string} message message objects or url
	 * @param {function} [cb] callback function
	 */
	load: function(key, message, cb) {
		loadData(key, message, cb, 'json');
	},
	loadYAML: function(key, message, cb) {
		loadData(key, message, cb, 'yaml');
	},
	error: error
};


/**
 * @typedef {object} message~ERROR
 * @property {string} type error type (`common.***`)
 * @property {number} code error code (`400`, `403`)
 * @property {string} message error message.
 * @example
 * {
 * 	"code": 403,
 * 	"type": "common.forbidden",
 * 	"message": "access forbidden, The request may not be properl authorize.y"
 * }
 */