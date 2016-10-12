'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

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

var OffCanvas = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
	_inherits(OffCanvas, _Component);

	function OffCanvas(props) {
		_classCallCheck(this, OffCanvas);

		var _this = _possibleConstructorReturn(this, (OffCanvas.__proto__ || Object.getPrototypeOf(OffCanvas)).call(this, props));

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
			var leftType = _props.leftType;
			var rightType = _props.rightType;
			var _state = this.state;
			var openLeft = _state.openLeft;
			var openRight = _state.openRight;
			var expanded = _state.expanded;


			var leftPushStyles = [leftType === 'push' && styles.push, { left: 0 }];

			var rightPushStyles = [rightType === 'push' && styles.push, { right: 0 }];

			var containerStyles = function containerStyles(marginLeft) {
				return [styles.container, { marginLeft: marginLeft }];
			},
			    sidebarStyles = function sidebarStyles(width) {
				return [styles.sidebar, { width: width }, leftType === 'overlay' && styles.overlay, leftPushStyles, leftStyle];
			},
			    mainStyles = [styles.content, style],
			    auxbarStyles = function auxbarStyles(width) {
				return [styles.auxbar, { width: width }, rightType === 'overlay' && styles.overlay, rightPushStyles, rightStyle];
			};

			return _react2.default.createElement(
				'div',
				{ style: containerStyles(this._calculatePush()) },
				_react2.default.createElement(
					'div',
					{ style: sidebarStyles(this._calculateLeft('width')) },
					this.props.leftSidebar
				),
				_react2.default.createElement(
					'div',
					{ style: mainStyles },
					this.props.children
				),
				_react2.default.createElement(
					'div',
					{ style: auxbarStyles(this._calculateRight('width')) },
					this.props.rightSidebar
				)
			);
		}
	}, {
		key: 'toggleLeft',
		value: function toggleLeft() {
			var _props2 = this.props;
			var leftType = _props2.leftType;
			var rightType = _props2.rightType;


			if (leftType === 'push' && rightType === 'push') {
				this.setState({ openLeft: !this.state.openLeft, openRight: false });
			} else {
				this.setState({ openLeft: !this.state.openLeft });
			}
		}
	}, {
		key: 'toggleRight',
		value: function toggleRight() {
			var _props3 = this.props;
			var leftType = _props3.leftType;
			var rightType = _props3.rightType;


			if (leftType === 'push' && rightType === 'push') {

				if (this.state.openRight) {
					this.setState({
						openRight: false,
						expanded: false
					});
				} else {
					this.setState({
						openRight: true,
						openLeft: false
					});
				}
			} else {

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
		key: '_calculatePush',
		value: function _calculatePush() {
			var _props4 = this.props;
			var rightType = _props4.rightType;
			var leftType = _props4.leftType;
			var _state2 = this.state;
			var openLeft = _state2.openLeft;
			var openRight = _state2.openRight;
			var expanded = _state2.expanded;


			if (openLeft && leftType === 'push') {

				return this.props.leftWidth;
			} else if (openRight && rightType === 'push') {

				if (this.state.expanded) {
					return this.props.expandedWidth * -1;
				}

				return this.props.rightWidth * -1;
			}
		}
	}, {
		key: '_calculateRight',
		value: function _calculateRight(type) {
			if (this.state.openRight) {
				switch (this.props.rightType) {
					case 'squeeze':
						if (this.state.expanded) return this.props.expandedWidth;
						return this.props.rightWidth;

					case 'push':
						if (this.state.expanded) return this.props.expandedWidth;
						return this.props.rightWidth;

					case 'overlay':
						if (this.state.expanded) return type === 'padding' ? 0 : this.props.expandedWidth;
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
					case 'push':
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
	container: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		transition: 'margin 0.4s ease-out'
	},
	sidebar: {
		width: 0,
		height: '100%',
		position: 'relative',
		paddingLeft: 0,
		zIndex: 0,
		overflow: 'hidden',
		transition: 'width 0.4s ease-out'
	},
	auxbar: {
		width: 0,
		position: 'relative',
		height: '100%',
		right: 0,
		zIndex: 0,
		overflow: 'hidden',
		transition: 'width 0.4s ease-out'
	},
	overlay: {
		position: 'absolute',
		zIndex: 2
	},
	push: {
		position: 'absolute'
	},
	content: {
		width: 'auto',
		height: '100%',
		paddingLeft: 0,
		zIndex: 1,
		flex: 1,
		position: 'relative',
		pointerEvents: 'none'
	}
};