'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _infiniteComputer = require('./infiniteComputer');

var _infiniteComputer2 = _interopRequireDefault(_infiniteComputer);

var _binaryIndexSearch = require('../utils/binaryIndexSearch');

var _binaryIndexSearch2 = _interopRequireDefault(_binaryIndexSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrayInfiniteComputer = function (_InfiniteComputer) {
	_inherits(ArrayInfiniteComputer, _InfiniteComputer);

	function ArrayInfiniteComputer(heightData, numberOfChildren) {
		_classCallCheck(this, ArrayInfiniteComputer);

		var _this = _possibleConstructorReturn(this, (ArrayInfiniteComputer.__proto__ || Object.getPrototypeOf(ArrayInfiniteComputer)).call(this, heightData, numberOfChildren));

		_this.prefixHeightData = _this.heightData.reduce(function (acc, next) {
			if (acc.length === 0) {
				return [next];
			} else {
				acc.push(acc[acc.length - 1] + next);
				return acc;
			}
		}, []);
		return _this;
	}

	_createClass(ArrayInfiniteComputer, [{
		key: 'maybeIndexToIndex',
		value: function maybeIndexToIndex(index) {
			if (typeof index === 'undefined' || index === null) {
				return this.prefixHeightData.length - 1;
			} else {
				return index;
			}
		}
	}, {
		key: 'getTotalScrollableHeight',
		value: function getTotalScrollableHeight() {
			var length = this.prefixHeightData.length;
			return length === 0 ? 0 : this.prefixHeightData[length - 1];
		}
	}, {
		key: 'getDisplayIndexStart',
		value: function getDisplayIndexStart(windowTop) {
			var foundIndex = _binaryIndexSearch2.default.binaryIndexSearch(this.prefixHeightData, windowTop, _binaryIndexSearch2.default.opts.CLOSEST_HIGHER);
			return this.maybeIndexToIndex(foundIndex);
		}
	}, {
		key: 'getDisplayIndexEnd',
		value: function getDisplayIndexEnd(windowBottom) {
			var foundIndex = _binaryIndexSearch2.default.binaryIndexSearch(this.prefixHeightData, windowBottom, _binaryIndexSearch2.default.opts.CLOSEST_HIGHER);
			return this.maybeIndexToIndex(foundIndex);
		}
	}, {
		key: 'getTopSpacerHeight',
		value: function getTopSpacerHeight(displayIndexStart) {
			var previous = displayIndexStart - 1;
			return previous < 0 ? 0 : this.prefixHeightData[previous];
		}
	}, {
		key: 'getBottomSpacerHeight',
		value: function getBottomSpacerHeight(displayIndexEnd) {
			if (displayIndexEnd === -1) {
				return 0;
			}
			return this.getTotalScrollableHeight() - this.prefixHeightData[displayIndexEnd];
		}
	}]);

	return ArrayInfiniteComputer;
}(_infiniteComputer2.default);

exports.default = ArrayInfiniteComputer;