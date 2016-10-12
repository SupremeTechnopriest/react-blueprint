'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
	_inherits(View, _Component);

	function View() {
		_classCallCheck(this, View);

		return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
	}

	_createClass(View, [{
		key: 'render',
		value: function render() {

			var dynamicStyles = {},
			    widthClass = void 0;

			if (typeof this.props.width === 'number') {
				dynamicStyles.flexGrow = this.props.width;
			} else if (this.props.width) {
				dynamicStyles.width = this.props.width;
				widthClass = styles.width;
			}

			if (this.props.height) {
				dynamicStyles.height = this.props.height;
			}

			if (this.props.auto) dynamicStyles.flex = '1 0 0';

			var passedProps = {
				onClick: this.props.onClick ? this.props.onClick : function () {},
				className: this.props.className || ''
			};

			var style = void 0;
			if (this.props.style) {
				style = [styles.flex, this.props.row && styles.row, this.props.column && styles.column, this.props.height && styles.height, widthClass, dynamicStyles, this.props.style];
			} else {
				style = [styles.flex, this.props.row && styles.row, this.props.column && styles.column, this.props.height && styles.height, widthClass, dynamicStyles];
			}

			return _react2.default.createElement(
				'div',
				_extends({ style: style }, passedProps),
				this.props.children
			);
		}
	}]);

	return View;
}(_react.Component), _class2.propTypes = {
	row: _react.PropTypes.bool,
	column: _react.PropTypes.bool,
	auto: _react.PropTypes.bool,
	className: _react.PropTypes.string,
	height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	style: _react.PropTypes.object,
	width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
}, _class2.defaultProps = {
	width: 1
}, _temp)) || _class;

exports.default = View;


var styles = {
	flex: {
		boxSizing: 'border-box',
		display: 'flex',
		flexWrap: 'nowrap',
		flex: '1 0 auto',
		justifyContent: 'space-between',
		alignContent: 'space-between',
		alignItems: 'stretch'
	},
	row: {
		flexDirection: 'row'
	},
	column: {
		flexDirection: 'column'
	},
	width: {
		flexBasis: 'auto',
		flexGrow: 0,
		flexShrink: 0
	},
	height: {
		flexBasis: 'auto',
		flexGrow: 0,
		flexShrink: 0
	}
};