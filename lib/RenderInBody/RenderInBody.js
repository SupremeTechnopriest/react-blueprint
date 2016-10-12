'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RenderInBody = function (_Component) {
	_inherits(RenderInBody, _Component);

	function RenderInBody() {
		_classCallCheck(this, RenderInBody);

		return _possibleConstructorReturn(this, (RenderInBody.__proto__ || Object.getPrototypeOf(RenderInBody)).apply(this, arguments));
	}

	_createClass(RenderInBody, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.child = document.createElement('div');
			document.body.appendChild(this.child);
			this._renderLayer();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this._renderLayer();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			(0, _reactDom.unmountComponentAtNode)(this.child);
			document.body.removeChild(this.child);
		}
	}, {
		key: '_renderLayer',
		value: function _renderLayer() {
			(0, _reactDom.render)(this.props.children, this.child);
		}
	}, {
		key: 'render',
		value: function render() {
			// Render a placeholder
			return _react2.default.DOM.div();
		}
	}]);

	return RenderInBody;
}(_react.Component);

var decorateRenderInBody = function decorateRenderInBody(ComposedComponent) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	return function (_Component2) {
		_inherits(_class2, _Component2);

		function _class2() {
			var _ref;

			var _temp, _this2, _ret;

			_classCallCheck(this, _class2);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this2), _this2.child = null, _temp), _possibleConstructorReturn(_this2, _ret);
		}

		_createClass(_class2, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.child = document.createElement('div');
				document.body.appendChild(this.child);
				this._renderLayer();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				this._renderLayer();
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				(0, _reactDom.unmountComponentAtNode)(this.child);
				document.body.removeChild(this.child);
			}
		}, {
			key: '_renderLayer',
			value: function _renderLayer() {
				(0, _reactDom.render)(_react2.default.createElement(ComposedComponent, null), this.child);
			}
		}, {
			key: 'render',
			value: function render() {
				// Render a placeholder
				return _react2.default.DOM.div();
			}
		}]);

		return _class2;
	}(_react.Component);
};

var _RenderInBody = function _RenderInBody(element) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	switch (typeof element === 'undefined' ? 'undefined' : _typeof(element)) {
		case 'object':
			return _react2.default.createElement(
				RenderInBody,
				null,
				element.children
			);
		case 'function':
			return decorateRenderInBody(element);
		default:
			return;
	}
};

exports.default = _RenderInBody;