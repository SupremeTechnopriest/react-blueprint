'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module provides a centralized place for
// runtime checking that the props passed to React Infinite
// make the minimum amount of sense.

var checkProps = function checkProps(props) {

    var invariant = 'Invariant Violation: ';

    if (!(props.containerHeight || props.useWindowAsScrollContainer)) {
        throw new Error(invariant + 'Either containerHeight or useWindowAsScrollContainer must be provided.');
    }

    if (props.optimizeRendering && !(_lodash2.default.isFinite(props.elementHeight) || Array.isArray(props.elementHeight))) {
        throw new Error(invariant + 'You must provide either a number or an array of numbers as the elementHeight.');
    }

    if (Array.isArray(props.elementHeight)) {
        if (_react2.default.Children.count(props.children) !== props.elementHeight.length) {
            throw new Error(invariant + 'There must be as many values provided in the elementHeight prop as there are children.');
        }
    }
};

exports.default = checkProps;