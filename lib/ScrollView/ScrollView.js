'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * ScrollView
                    *
                    */

// React


// Utils


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _scaleEnum = require('./utils/scaleEnum');

var _scaleEnum2 = _interopRequireDefault(_scaleEnum);

var _infiniteHelpers = require('./utils/infiniteHelpers');

var _infiniteHelpers2 = _interopRequireDefault(_infiniteHelpers);

var _types = require('./utils/types');

var _checkProps = require('./utils/checkProps');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollView = (_temp = _class = function (_Component) {
	_inherits(ScrollView, _Component);

	_createClass(ScrollView, null, [{
		key: 'containerHeightScaleFactor',
		value: function containerHeightScaleFactor(factor) {
			if (!_lodash2.default.isFinite(factor)) {
				throw new Error('The scale factor must be a number.');
			}
			return {
				type: _scaleEnum2.default.CONTAINER_HEIGHT_SCALE_FACTOR,
				amount: factor
			};
		}

		// Properties currently used but which may be
		// refactored away in the future.

	}]);

	function ScrollView(props) {
		_classCallCheck(this, ScrollView);

		var _this = _possibleConstructorReturn(this, (ScrollView.__proto__ || Object.getPrototypeOf(ScrollView)).call(this, props));

		_this.computedProps = {};
		_this.utils = {};
		_this.shouldAttachToBottom = false;
		_this.preservedScrollState = 0;
		_this.loadingSpinnerHeight = 0;
		_this.deprecationWarned = false;


		var nextInternalState = _this.recomputeInternalStateFromProps(_this.props);

		_this.computedProps = nextInternalState.computedProps;
		_this.utils = nextInternalState.utils;
		_this.shouldAttachToBottom = _this.props.displayBottomUpwards;

		var state = nextInternalState.newState;
		state.scrollTimeout = undefined;
		state.isScrolling = false;
		state.optimize = !_this.props.optimizeRendering ? false : !_this.props.delayOptimizations ? false : true;

		_this.state = state;

		return _this;
	}

	_createClass(ScrollView, [{
		key: 'generateComputedProps',
		value: function generateComputedProps(props) {
			// These are extracted so their type definitions do not conflict.
			var containerHeight = props.containerHeight;
			var preloadBatchSize = props.preloadBatchSize;
			var preloadAdditionalHeight = props.preloadAdditionalHeight;

			var oldProps = _objectWithoutProperties(props, ['containerHeight', 'preloadBatchSize', 'preloadAdditionalHeight']);

			var newProps = {};
			containerHeight = typeof containerHeight === 'number' ? containerHeight : 0;
			newProps.containerHeight = props.useWindowAsScrollContainer ? window.innerHeight : containerHeight;

			if (oldProps.infiniteLoadBeginBottomOffset !== undefined) {
				newProps.infiniteLoadBeginEdgeOffset = oldProps.infiniteLoadBeginBottomOffset;
			}

			var defaultPreloadBatchSizeScaling = {
				type: _scaleEnum2.default.CONTAINER_HEIGHT_SCALE_FACTOR,
				amount: 0.5
			};
			var batchSize = preloadBatchSize && preloadBatchSize.type ? preloadBatchSize : defaultPreloadBatchSizeScaling;

			if (typeof preloadBatchSize === 'number') {
				newProps.preloadBatchSize = preloadBatchSize;
			} else if (batchSize.type === _scaleEnum2.default.CONTAINER_HEIGHT_SCALE_FACTOR) {
				newProps.preloadBatchSize = newProps.containerHeight * batchSize.amount;
			} else {
				newProps.preloadBatchSize = 0;
			}

			var defaultPreloadAdditionalHeightScaling = {
				type: _scaleEnum2.default.CONTAINER_HEIGHT_SCALE_FACTOR,
				amount: 1
			};
			var additionalHeight = preloadAdditionalHeight && preloadAdditionalHeight.type ? preloadAdditionalHeight : defaultPreloadAdditionalHeightScaling;
			if (typeof preloadAdditionalHeight === 'number') {
				newProps.preloadAdditionalHeight = preloadAdditionalHeight;
			} else if (additionalHeight.type === _scaleEnum2.default.CONTAINER_HEIGHT_SCALE_FACTOR) {
				newProps.preloadAdditionalHeight = newProps.containerHeight * additionalHeight.amount;
			} else {
				newProps.preloadAdditionalHeight = 0;
			}

			return Object.assign(oldProps, newProps);
		}
	}, {
		key: 'generateComputedUtilityFunctions',
		value: function generateComputedUtilityFunctions(props) {
			var _this2 = this;

			var utilities = {};
			utilities.getLoadingSpinnerHeight = function () {
				var loadingSpinnerHeight = 0;
				if (_this2.refs && _this2.refs.loadingSpinner) {
					var loadingSpinnerNode = (0, _reactDom.findDOMNode)(_this2.refs.loadingSpinner);
					loadingSpinnerHeight = loadingSpinnerNode.offsetHeight || 0;
				}
				return loadingSpinnerHeight;
			};
			if (props.useWindowAsScrollContainer) {
				utilities.subscribeToScrollListener = function () {
					if (_this2.state.optimize) {
						window.addEventListener('scroll', _this2.infiniteHandleScroll.bind(_this2));
					}
				};
				utilities.unsubscribeFromScrollListener = function () {
					if (_this2.state.optimize) {
						window.removeEventListener('scroll', _this2.infiniteHandleScroll);
					}
				};
				utilities.nodeScrollListener = function () {};
				utilities.getScrollTop = function () {
					return window.pageYOffset;
				};
				utilities.setScrollTop = function (top) {
					window.scroll(window.pageXOffset, top);
				};
				utilities.scrollShouldBeIgnored = function () {
					return false;
				};
				utilities.buildScrollableStyle = function () {
					return {};
				};
			} else {
				utilities.subscribeToScrollListener = function () {};
				utilities.unsubscribeFromScrollListener = function () {};
				utilities.nodeScrollListener = this.infiniteHandleScroll;
				utilities.getScrollTop = function () {
					var scrollable = void 0;
					if (_this2.refs && _this2.refs.scrollable) {
						scrollable = (0, _reactDom.findDOMNode)(_this2.refs.scrollable);
					}
					return scrollable ? scrollable.scrollTop : 0;
				};

				utilities.setScrollTop = function (top) {
					var scrollable = void 0;
					if (_this2.refs && _this2.refs.scrollable) {
						scrollable = (0, _reactDom.findDOMNode)(_this2.refs.scrollable);
					}
					if (scrollable) {
						scrollable.scrollTop = top;
					}
				};
				utilities.scrollShouldBeIgnored = function (event) {
					return event.target !== (0, _reactDom.findDOMNode)(_this2.refs.scrollable);
				};

				utilities.buildScrollableStyle = function () {
					return {
						height: _this2.computedProps.containerHeight,
						overflowX: 'hidden',
						overflowY: 'scroll',
						WebkitOverflowScrolling: 'touch'
					};
				};
			}
			return utilities;
		}
	}, {
		key: 'recomputeInternalStateFromProps',
		value: function recomputeInternalStateFromProps(props) {
			(0, _checkProps2.default)(props);
			var computedProps = this.generateComputedProps(props);
			var utils = this.generateComputedUtilityFunctions(props);

			var newState = {};

			newState.numberOfChildren = _react2.default.Children.count(computedProps.children);
			newState.infiniteComputer = _infiniteHelpers2.default.createInfiniteComputer(computedProps.elementHeight, computedProps.children, computedProps.displayBottomUpwards);

			if (computedProps.isInfiniteLoading !== undefined) {
				newState.isInfiniteLoading = computedProps.isInfiniteLoading;
			}

			newState.preloadBatchSize = computedProps.preloadBatchSize;
			newState.preloadAdditionalHeight = computedProps.preloadAdditionalHeight;

			newState = Object.assign(newState, _infiniteHelpers2.default.recomputeApertureStateFromOptionsAndScrollTop(newState, utils.getScrollTop()));

			return {
				computedProps: computedProps,
				utils: utils,
				newState: newState
			};
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var nextInternalState = this.recomputeInternalStateFromProps(nextProps);

			this.computedProps = nextInternalState.computedProps;
			this.utils = nextInternalState.utils;

			this.setState(nextInternalState.newState);
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			if (this.props.displayBottomUpwards) {
				this.preservedScrollState = this.utils.getScrollTop() - this.loadingSpinnerHeight;
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			this.loadingSpinnerHeight = this.utils.getLoadingSpinnerHeight();

			if (this.props.displayBottomUpwards) {
				var lowestScrollTop = this.getLowestPossibleScrollTop();
				if (this.shouldAttachToBottom && this.utils.getScrollTop() < lowestScrollTop) {
					this.utils.setScrollTop(lowestScrollTop);
				} else if (prevProps.isInfiniteLoading && !this.props.isInfiniteLoading) {
					this.utils.setScrollTop(this.state.infiniteComputer.getTotalScrollableHeight() - prevState.infiniteComputer.getTotalScrollableHeight() + this.preservedScrollState);
				}
			}
			if (_react2.default.Children.count(this.props.children) !== _react2.default.Children.count(prevProps.children)) {
				var newApertureState = _infiniteHelpers2.default.recomputeApertureStateFromOptionsAndScrollTop(this.state, this.utils.getScrollTop());
				this.setState(newApertureState);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this3 = this;

			this.utils.subscribeToScrollListener();
			if (_lodash2.default.isFinite(this.computedProps.infiniteLoadBeginEdgeOffset) && this.state.infiniteComputer.getTotalScrollableHeight() < this.computedProps.containerHeight) {
				this.setState({
					isInfiniteLoading: true
				});
				this.computedProps.onInfiniteLoad();
			}

			if (this.props.displayBottomUpwards) {
				var lowestScrollTop = this.getLowestPossibleScrollTop();
				if (this.shouldAttachToBottom && this.utils.getScrollTop() < lowestScrollTop) {
					this.utils.setScrollTop(lowestScrollTop);
				}
			}

			if (!this.state.optimize && this.props.delayOptimizations) setTimeout(function () {
				_this3.setState({ optimize: true });
			}, this.props.delayOptimizations);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.utils.unsubscribeFromScrollListener();
		}
	}, {
		key: 'infiniteHandleScroll',
		value: function infiniteHandleScroll(e) {

			if (!this.state.optimize && this.utils.scrollShouldBeIgnored(e)) {
				return;
			}
			this.computedProps.handleScroll((0, _reactDom.findDOMNode)(this.refs.scrollable));
			this.handleScroll(this.utils.getScrollTop());
		}
	}, {
		key: 'manageScrollTimeouts',
		value: function manageScrollTimeouts() {
			var _this4 = this;

			// Maintains a series of timeouts to set this.state.isScrolling
			// to be true when the element is scrolling.

			if (this.state.scrollTimeout) {
				clearTimeout(this.state.scrollTimeout);
			}

			var scrollTimeout = setTimeout(function () {
				_this4.setState({
					isScrolling: false,
					scrollTimeout: undefined
				});
			}, this.computedProps.timeScrollStateLastsForAfterUserScrolls);

			this.setState({
				isScrolling: true,
				scrollTimeout: scrollTimeout
			});
		}
	}, {
		key: 'getLowestPossibleScrollTop',
		value: function getLowestPossibleScrollTop() {
			return this.state.infiniteComputer.getTotalScrollableHeight() - this.computedProps.containerHeight;
		}
	}, {
		key: 'passedEdgeForInfiniteScroll',
		value: function passedEdgeForInfiniteScroll(scrollTop) {
			if (this.computedProps.displayBottomUpwards) {
				return !this.shouldAttachToBottom && scrollTop < this.computedProps.infiniteLoadBeginEdgeOffset;
			} else {
				return scrollTop > this.state.infiniteComputer.getTotalScrollableHeight() - this.computedProps.containerHeight - this.computedProps.infiniteLoadBeginEdgeOffset;
			}
		}
	}, {
		key: 'handleScroll',
		value: function handleScroll(scrollTop) {
			this.shouldAttachToBottom = this.computedProps.displayBottomUpwards && scrollTop >= this.getLowestPossibleScrollTop();

			this.manageScrollTimeouts();

			var newApertureState = _infiniteHelpers2.default.recomputeApertureStateFromOptionsAndScrollTop(this.state, scrollTop);

			if (this.passedEdgeForInfiniteScroll(scrollTop) && !this.state.isInfiniteLoading) {
				this.setState(Object.assign({}, newApertureState, {
					isInfiniteLoading: true
				}));
				this.computedProps.onInfiniteLoad();
			} else {
				this.setState(newApertureState);
			}
		}
	}, {
		key: 'buildHeightStyle',
		value: function buildHeightStyle(height) {
			return {
				width: '100%',
				height: Math.ceil(height)
			};
		}
	}, {
		key: 'scrollTo',
		value: function scrollTo(top) {
			(0, _reactDom.findDOMNode)(this.refs.scrollable).scrollTop = top;
		}
	}, {
		key: 'render',
		value: function render() {

			var displayables;
			if (_react2.default.Children.count(this.computedProps.children) > 1 && this.state.optimize) {
				displayables = this.computedProps.children.slice(this.state.displayIndexStart, this.state.displayIndexEnd + 1);
			} else {
				displayables = this.computedProps.children;
			}

			var infiniteScrollStyles = {};
			if (this.state.isScrolling) {
				infiniteScrollStyles.pointerEvents = 'none';
			}

			var topSpacerHeight = this.state.optimize ? this.state.infiniteComputer.getTopSpacerHeight(this.state.displayIndexStart) : 0,
			    bottomSpacerHeight = this.state.optimize ? this.state.infiniteComputer.getBottomSpacerHeight(this.state.displayIndexEnd) : 0;

			// This asymmetry is due to a reluctance to use CSS to control
			// the bottom alignment
			if (this.computedProps.displayBottomUpwards) {
				var heightDifference = this.computedProps.containerHeight - this.state.infiniteComputer.getTotalScrollableHeight();
				if (heightDifference > 0) {
					topSpacerHeight = heightDifference - this.loadingSpinnerHeight;
				}
			}

			var loadingSpinner = this.computedProps.infiniteLoadBeginEdgeOffset === undefined ? null : _react2.default.createElement(
				'div',
				{ ref: 'loadingSpinner' },
				this.state.isInfiniteLoading ? this.computedProps.loadingSpinnerDelegate : null
			);

			// topSpacer and bottomSpacer take up the amount of space that the
			// rendered elements would have taken up otherwise
			return _react2.default.createElement(
				'div',
				{
					className: this.computedProps.className,
					ref: 'scrollable',
					style: this.utils.buildScrollableStyle(),
					onScroll: this.utils.nodeScrollListener.bind(this) },
				_react2.default.createElement(
					'div',
					{
						ref: 'smoothScrollingWrapper',
						style: infiniteScrollStyles },
					_react2.default.createElement('div', {
						ref: 'topSpacer',
						style: this.buildHeightStyle(topSpacerHeight) }),
					this.computedProps.displayBottomUpwards && loadingSpinner,
					displayables,
					!this.computedProps.displayBottomUpwards && loadingSpinner,
					_react2.default.createElement('div', {
						ref: 'bottomSpacer',
						style: this.buildHeightStyle(bottomSpacerHeight) })
				)
			);
		}
	}]);

	return ScrollView;
}(_react.Component), _class.propTypes = {
	children: _react.PropTypes.any,

	handleScroll: _react.PropTypes.func,

	// preloadBatchSize causes updates only to
	// happen each preloadBatchSize pixels of scrolling.
	// Set a larger number to cause fewer updates to the
	// element list.
	preloadBatchSize: _types.preloadType,
	// preloadAdditionalHeight determines how much of the
	// list above and below the container is preloaded even
	// when it is not currently visible to the user. In the
	// regular scroll implementation, preloadAdditionalHeight
	// is equal to the entire height of the list.
	preloadAdditionalHeight: _types.preloadType, // page to screen ratio

	// The provided elementHeight can be either
	//  1. a constant: all elements are the same height
	//  2. an array containing the height of each element
	elementHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)]),
	// This is the total height of the visible window.
	containerHeight: _react.PropTypes.number,
	useWindowAsScrollContainer: _react.PropTypes.bool,

	displayBottomUpwards: _react.PropTypes.bool.isRequired,

	infiniteLoadBeginEdgeOffset: _react.PropTypes.number,
	onInfiniteLoad: _react.PropTypes.func,
	loadingSpinnerDelegate: _react.PropTypes.node,

	isInfiniteLoading: _react.PropTypes.bool,
	timeScrollStateLastsForAfterUserScrolls: _react.PropTypes.number,

	// Delays the optimizations.  Useful if you need to calculate children height
	// Timeout in milliseconds, 0 for no delay
	delayOptimizations: _react.PropTypes.number,

	className: _react.PropTypes.string
}, _class.defaultProps = {
	handleScroll: function handleScroll() {},

	useWindowAsScrollContainer: false,

	optimizeRendering: true,

	onInfiniteLoad: function onInfiniteLoad() {},
	loadingSpinnerDelegate: _react2.default.createElement('div', null),

	displayBottomUpwards: false,

	isInfiniteLoading: false,
	timeScrollStateLastsForAfterUserScrolls: 150,

	className: ''
}, _temp);
exports.default = ScrollView;