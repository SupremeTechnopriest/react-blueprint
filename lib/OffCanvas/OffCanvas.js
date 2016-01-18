'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OffCanvas = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
	_inherits(OffCanvas, _Component);

	function OffCanvas(props) {
		_classCallCheck(this, OffCanvas);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OffCanvas).call(this, props));

		_this.state = {
			openRight: false,
			openLeft: false,
			expanded: false
		};

		_this.state.openRight = props.rightOpen;
		_this.state.openLeft = props.leftOpen;
		_this.state.expanded = false;
		return _this;
	}

	_createClass(OffCanvas, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var leftWidth = _props.leftWidth;
			var rightWidth = _props.rightWidth;
			var expandedWidth = _props.expandedWidth;
			var partial = _props.partial;
			var style = _props.style;
			var leftStyle = _props.leftStyle;
			var rightStyle = _props.rightStyle;
			var _state = this.state;
			var openLeft = _state.openLeft;
			var openRight = _state.openRight;
			var expanded = _state.expanded;

			var sidebarStyles = function sidebarStyles(width) {
				return [styles.sidebar, { width: width }, leftStyle];
			};
			var mainStyles = function mainStyles(paddingLeft, paddingRight) {
				return [styles.content, { paddingLeft: paddingLeft, paddingRight: paddingRight }, style];
			};
			var auxbarStyles = function auxbarStyles(width) {
				return [styles.auxbar, { width: width }, rightStyle];
			};

			var defaults = {
				leftWidth: this._calculateLeft('width'),
				rightWidth: this._calculateRight('width'),
				paddingLeft: this._calculateLeft('padding'),
				paddingRight: this._calculateRight('padding')
			};

			var springs = {
				leftWidth: (0, _reactMotion.spring)(this._calculateLeft('width')),
				rightWidth: (0, _reactMotion.spring)(this._calculateRight('width')),
				paddingLeft: (0, _reactMotion.spring)(this._calculateLeft('padding')),
				paddingRight: (0, _reactMotion.spring)(this._calculateRight('padding'))
			};

			return _react2.default.createElement(
				'div',
				{ style: styles.container },
				_react2.default.createElement(
					'div',
					{ style: sidebarStyles(this._calculateLeft('width')) },
					this.props.leftSidebar
				),
				_react2.default.createElement(
					'div',
					{ style: auxbarStyles(this._calculateRight('width')) },
					this.props.rightSidebar
				),
				_react2.default.createElement(
					'div',
					{ style: mainStyles(this._calculateLeft('padding'), this._calculateRight('padding')) },
					this.props.children
				)
			);
		}
	}, {
		key: 'toggleLeft',
		value: function toggleLeft() {
			this.setState({ openLeft: !this.state.openLeft });
		}
	}, {
		key: 'toggleRight',
		value: function toggleRight() {

			if (this.state.openRight) {
				this.setState({
					openRight: false,
					expanded: false
				});
			} else {
				this.setState({
					openRight: true
				});
			}
		}
	}, {
		key: 'toggleExpandRight',
		value: function toggleExpandRight() {
			if (this.state.openRight) {
				this.setState({
					expanded: !this.state.expanded
				});
			} else {
				this.setState({
					openRight: true,
					expanded: true
				});
			}
		}
	}, {
		key: 'closeLeft',
		value: function closeLeft() {
			this.setState({ openLeft: false });
		}
	}, {
		key: 'closeRight',
		value: function closeRight() {
			this.setState({ openRight: false });
		}
	}, {
		key: '_calculateRight',
		value: function _calculateRight(type) {
			if (this.state.openRight) {
				switch (this.props.rightType) {
					case 'squeeze':
						if (this.state.expanded) return this.props.expandedWidth;
						return this.props.rightWidth;
					case 'overlay':
						if (this.state.expanded) {
							return type === 'padding' ? 0 : this.props.expandedWidth;
						}
						return type === 'padding' ? 0 : this.props.rightWidth;
				}
			} else {
				return 0;
			}
		}
	}, {
		key: '_calculateLeft',
		value: function _calculateLeft(type) {
			if (this.state.openLeft) {
				switch (this.props.leftType) {
					case 'squeeze':
						return this.props.leftWidth;
					case 'overlay':
						return type === 'padding' ? 0 : this.props.leftWidth;
				}
			} else {
				if (this.props.partial) return this.props.partialWidth;
				return 0;
			}
		}
	}]);

	return OffCanvas;
}(_react.Component), _class2.propTypes = {
	leftSidebar: _react.PropTypes.any,
	leftWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	partialWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	rightSidebar: _react.PropTypes.any,
	rightWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	expandedWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	leftOpen: _react.PropTypes.bool,
	rightOpen: _react.PropTypes.bool,
	partial: _react.PropTypes.bool,
	leftType: _react.PropTypes.oneOf(['push', 'squeeze', 'overlay']),
	rightType: _react.PropTypes.oneOf(['push', 'squeeze', 'overlay']),
	border: _react.PropTypes.bool,
	leftStyle: _react.PropTypes.object,
	rightStyle: _react.PropTypes.object,
	style: _react.PropTypes.object
}, _class2.defaultProps = {
	leftSidebar: null,
	rightSidebar: null,
	leftOpen: false,
	rightOpen: false,
	leftType: 'push',
	rightType: 'squeeze',
	partial: true
}, _temp)) || _class;

exports.default = OffCanvas;

var styles = {
	container: { height: '100%' },
	sidebar: {
		width: 0,
		height: '100%',
		position: 'fixed',
		paddingLeft: 0,
		float: 'left',
		zIndex: 0,
		overflow: 'hidden',
		transition: 'width 0.5s ease'
	},
	auxbar: {
		width: 0,
		height: '100%',
		position: 'fixed',
		right: 0,
		float: 'left',
		zIndex: 0,
		overflow: 'hidden',
		transition: 'width 0.5s ease'
	},
	content: {
		width: 'auto',
		height: '100%',
		paddingLeft: 0,
		zIndex: 1,
		overflowX: 'hidden',
		position: 'relative',
		transition: 'padding 0.5s ease'
	}
};