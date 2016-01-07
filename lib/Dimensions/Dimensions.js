'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function defaultGetWidth(element) {
	return element.clientWidth || 1;
}

function defaultGetHeight(element) {
	return element.clientHeight || 0;
}

var styles = {
	width: '100%',
	height: '100%',
	padding: 0,
	border: 0
};

var getDimensions = function getDimensions(element) {

	// Reject no element
	if (!element) {
		return console.warn('Must supply an element, `window`, or `document` to Dimensions');
	}

	// Is document
	if (element.documentElement) {
		return {
			height: element.documentElement.clientHeight,
			width: element.documentElement.clientWidth
		};
	}

	var dimensions = undefined;

	// Is window
	if (isWindow(element)) {
		dimensions = {
			height: element.innerHeight,
			width: element.innerWidth
		};
	} else {
		dimensions = {
			height: element.offsetHeight,
			width: element.offsetWidth
		};
		var style = window.getComputedStyle(element);
		dimensions.height += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.borderBottomWidth) + parseInt(style.borderTopWidth);
		dimensions.width += parseInt(style.marginLeft) + parseInt(style.marginRight) + parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);
	}

	return dimensions;
};

var bindDimensions = function bindDimensions(ComposedComponent) {
	var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var _ref$getHeight = _ref.getHeight;
	var getHeight = _ref$getHeight === undefined ? defaultGetHeight : _ref$getHeight;
	var _ref$getWidth = _ref.getWidth;
	var getWidth = _ref$getWidth === undefined ? defaultGetWidth : _ref$getWidth;

	return (function (_Component) {
		_inherits(_class2, _Component);

		function _class2() {
			var _Object$getPrototypeO;

			var _temp, _this, _ret;

			_classCallCheck(this, _class2);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(_class2, [{
			key: 'updateDimensions',
			value: function updateDimensions() {

				var container = this.refs.container;

				if (!container || !Object.keys(container).length) return;
				this.setState({
					width: getWidth(container),
					height: getHeight(container)

				});
			}
		}, {
			key: 'onResize',
			value: function onResize() {
				var _this2 = this;

				if (this.rqf) return;
				this.rqf = window.requestAnimationFrame(function () {
					_this2.rqf = null;
					_this2.updateDimensions.apply(_this2);
				});
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this3 = this;

				window.addEventListener('resize', this.onResize.bind(this), false);
				setTimeout(function () {
					_this3.updateDimensions.apply(_this3);
				}, 1);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				window.removeEventListener('resize', this.onResize.bind(this));
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ style: styles, ref: 'container' },
					_react2.default.createElement(ComposedComponent, _extends({}, this.state, this.props, {
						getDimensions: this.getDimensions.bind(this),
						updateDimensions: this.updateDimensions.bind(this) }))
				);
			}
		}, {
			key: 'getDimensions',
			value: function getDimensions() {
				return this.state;
			}
		}]);

		return _class2;
	})(_react.Component);
};

var isWindow = function isWindow(element) {
	return element && element.document && element.location && element.alert && element.setInterval;
};

var Dimensions = function Dimensions(element) {
	var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	switch (typeof element === 'undefined' ? 'undefined' : _typeof(element)) {
		case 'object':
			return getDimensions(element);
		case 'function':
			return bindDimensions(element);
		default:
			return;
	}
};

exports.default = Dimensions;