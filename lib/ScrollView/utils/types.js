'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.preloadType = undefined;

var _react = require('react');

var preloadType = exports.preloadType = _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.shape({
	type: _react.PropTypes.oneOf(['containerHeightScaleFactor']).isRequired,
	amount: _react.PropTypes.number.isRequired
})]);

exports.default = { preloadType: preloadType };