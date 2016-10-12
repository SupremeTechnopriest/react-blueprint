'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constantInfiniteComputer = require('../computers/constantInfiniteComputer');

var _constantInfiniteComputer2 = _interopRequireDefault(_constantInfiniteComputer);

var _arrayInfiniteComputer = require('../computers/arrayInfiniteComputer');

var _arrayInfiniteComputer2 = _interopRequireDefault(_arrayInfiniteComputer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createInfiniteComputer(data, children) {
	var computer = void 0;
	var numberOfChildren = _react2.default.Children.count(children);

	// This should be guaranteed by checkProps
	if (Array.isArray(data)) {
		computer = new _arrayInfiniteComputer2.default(data, numberOfChildren);
	} else {
		computer = new _constantInfiniteComputer2.default(data, numberOfChildren);
	}
	return computer;
}

// Given the scrollTop of the container, computes the state the
// component should be in. The goal is to abstract all of this
// from any actual representation in the DOM.
// The window is the block with any preloadAdditionalHeight
// added to it.
function recomputeApertureStateFromOptionsAndScrollTop(_ref, scrollTop) {
	var preloadBatchSize = _ref.preloadBatchSize;
	var preloadAdditionalHeight = _ref.preloadAdditionalHeight;
	var infiniteComputer = _ref.infiniteComputer;

	var blockNumber = preloadBatchSize === 0 ? 0 : Math.floor(scrollTop / preloadBatchSize),
	    blockStart = preloadBatchSize * blockNumber,
	    blockEnd = blockStart + preloadBatchSize,
	    apertureTop = Math.max(0, blockStart - preloadAdditionalHeight),
	    apertureBottom = Math.min(infiniteComputer.getTotalScrollableHeight(), blockEnd + preloadAdditionalHeight);

	return {
		displayIndexStart: infiniteComputer.getDisplayIndexStart(apertureTop),
		displayIndexEnd: infiniteComputer.getDisplayIndexEnd(apertureBottom)
	};
}

exports.default = {
	createInfiniteComputer: createInfiniteComputer,
	recomputeApertureStateFromOptionsAndScrollTop: recomputeApertureStateFromOptionsAndScrollTop
};