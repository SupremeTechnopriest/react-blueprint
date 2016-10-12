'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _infiniteComputer = require('./infiniteComputer');

var _infiniteComputer2 = _interopRequireDefault(_infiniteComputer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConstantInfiniteComputer = function (_InfiniteComputer) {
	_inherits(ConstantInfiniteComputer, _InfiniteComputer);

	function ConstantInfiniteComputer() {
		_classCallCheck(this, ConstantInfiniteComputer);

		return _possibleConstructorReturn(this, (ConstantInfiniteComputer.__proto__ || Object.getPrototypeOf(ConstantInfiniteComputer)).apply(this, arguments));
	}

	_createClass(ConstantInfiniteComputer, [{
		key: 'getTotalScrollableHeight',
		value: function getTotalScrollableHeight() {
			return this.heightData * this.numberOfChildren;
		}
	}, {
		key: 'getDisplayIndexStart',
		value: function getDisplayIndexStart(windowTop) {
			return Math.floor(windowTop / this.heightData);
		}
	}, {
		key: 'getDisplayIndexEnd',
		value: function getDisplayIndexEnd(windowBottom) {
			var nonZeroIndex = Math.ceil(windowBottom / this.heightData);
			if (nonZeroIndex > 0) {
				return nonZeroIndex - 1;
			}
			return nonZeroIndex;
		}
	}, {
		key: 'getTopSpacerHeight',
		value: function getTopSpacerHeight(displayIndexStart) {
			return displayIndexStart * this.heightData;
		}
	}, {
		key: 'getBottomSpacerHeight',
		value: function getBottomSpacerHeight(displayIndexEnd) {
			var nonZeroIndex = displayIndexEnd + 1;
			return Math.max(0, (this.numberOfChildren - nonZeroIndex) * this.heightData);
		}
	}]);

	return ConstantInfiniteComputer;
}(_infiniteComputer2.default);

exports.default = ConstantInfiniteComputer;