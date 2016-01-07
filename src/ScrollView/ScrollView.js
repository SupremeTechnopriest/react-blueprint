/**
 * ScrollView
 *
 */

// React
import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode as $ } from 'react-dom';

// Utils
import scaleEnum from './utils/scaleEnum';
import infiniteHelpers from './utils/infiniteHelpers';
import { preloadType } from './utils/types';
import checkProps from './utils/checkProps';

import _ from 'lodash';

export default class ScrollView extends Component {

	static propTypes = {
		children: PropTypes.any,

		handleScroll: PropTypes.func,

		// preloadBatchSize causes updates only to
		// happen each preloadBatchSize pixels of scrolling.
		// Set a larger number to cause fewer updates to the
		// element list.
		preloadBatchSize: preloadType,
		// preloadAdditionalHeight determines how much of the
		// list above and below the container is preloaded even
		// when it is not currently visible to the user. In the
		// regular scroll implementation, preloadAdditionalHeight
		// is equal to the entire height of the list.
		preloadAdditionalHeight: preloadType, // page to screen ratio

		// The provided elementHeight can be either
		//  1. a constant: all elements are the same height
		//  2. an array containing the height of each element
		elementHeight: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.arrayOf(PropTypes.number)
		]),
		// This is the total height of the visible window.
		containerHeight: PropTypes.number,
		useWindowAsScrollContainer: PropTypes.bool,

		displayBottomUpwards: PropTypes.bool.isRequired,

		infiniteLoadBeginEdgeOffset: PropTypes.number,
		onInfiniteLoad: PropTypes.func,
		loadingSpinnerDelegate: PropTypes.node,

		isInfiniteLoading: PropTypes.bool,
		timeScrollStateLastsForAfterUserScrolls: PropTypes.number,

		// Delays the optimizations.  Useful if you need to calculate children height
		// Timeout in milliseconds, 0 for no delay
		delayOptimizations: PropTypes.number,

		className: PropTypes.string
	};

	static defaultProps = {
		handleScroll: () => {},

		useWindowAsScrollContainer: false,

		optimizeRendering: true,

		onInfiniteLoad: () => {},
		loadingSpinnerDelegate: <div /> ,

		displayBottomUpwards: false,

		isInfiniteLoading: false,
		timeScrollStateLastsForAfterUserScrolls: 150,

		className: ''
	};

	static containerHeightScaleFactor(factor) {
		if (!_.isFinite(factor)) {
			throw new Error('The scale factor must be a number.');
		}
		return {
			type: scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR,
			amount: factor
		};
	};

	// Properties currently used but which may be
	// refactored away in the future.
	computedProps = {};
	utils = {};
	shouldAttachToBottom = false;
	preservedScrollState = 0;
	loadingSpinnerHeight = 0;
	deprecationWarned = false;

	constructor(props) {
		super(props);

		let nextInternalState = this.recomputeInternalStateFromProps(this.props);

		this.computedProps = nextInternalState.computedProps;
		this.utils = nextInternalState.utils;
		this.shouldAttachToBottom = this.props.displayBottomUpwards;

		let state = nextInternalState.newState;
		state.scrollTimeout = undefined;
		state.isScrolling = false;
		state.optimize = !this.props.optimizeRendering ? false : !this.props.delayOptimizations ? false : true;

		this.state = state;

	}

	generateComputedProps(props) {
		// These are extracted so their type definitions do not conflict.
		let {
			containerHeight,
			preloadBatchSize,
			preloadAdditionalHeight,
			...oldProps
		} = props;

		let newProps = {};
		containerHeight = typeof containerHeight === 'number' ? containerHeight : 0;
		newProps.containerHeight = props.useWindowAsScrollContainer ? window.innerHeight : containerHeight;

		if (oldProps.infiniteLoadBeginBottomOffset !== undefined) {
			newProps.infiniteLoadBeginEdgeOffset = oldProps.infiniteLoadBeginBottomOffset;
		}

		let defaultPreloadBatchSizeScaling = {
			type: scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR,
			amount: 0.5
		};
		let batchSize = preloadBatchSize && preloadBatchSize.type ? preloadBatchSize : defaultPreloadBatchSizeScaling;

		if (typeof preloadBatchSize === 'number') {
			newProps.preloadBatchSize = preloadBatchSize;
		} else if (batchSize.type === scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR) {
			newProps.preloadBatchSize = newProps.containerHeight * batchSize.amount;
		} else {
			newProps.preloadBatchSize = 0;
		}

		let defaultPreloadAdditionalHeightScaling = {
			type: scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR,
			amount: 1
		};
		let additionalHeight = preloadAdditionalHeight && preloadAdditionalHeight.type ? preloadAdditionalHeight : defaultPreloadAdditionalHeightScaling;
		if (typeof preloadAdditionalHeight === 'number') {
			newProps.preloadAdditionalHeight = preloadAdditionalHeight;
		} else if (additionalHeight.type === scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR) {
			newProps.preloadAdditionalHeight = newProps.containerHeight * additionalHeight.amount;
		} else {
			newProps.preloadAdditionalHeight = 0;
		}

		return Object.assign(oldProps, newProps);
	
	}

	generateComputedUtilityFunctions(props) {
		let utilities = {};
		utilities.getLoadingSpinnerHeight = () => {
			let loadingSpinnerHeight = 0;
			if (this.refs && this.refs.loadingSpinner) {
				let loadingSpinnerNode = $(this.refs.loadingSpinner);
				loadingSpinnerHeight = loadingSpinnerNode.offsetHeight || 0;
			}
			return loadingSpinnerHeight;
		};
		if (props.useWindowAsScrollContainer) {
			utilities.subscribeToScrollListener = () => {
				if(this.state.optimize) {
					window.addEventListener('scroll', this.infiniteHandleScroll.bind(this));
				}
			};
			utilities.unsubscribeFromScrollListener = () => {
				if(this.state.optimize) {
					window.removeEventListener('scroll', this.infiniteHandleScroll);
				}
			};
			utilities.nodeScrollListener = () => {};
			utilities.getScrollTop = () => window.pageYOffset;
			utilities.setScrollTop = (top) => {
				window.scroll(window.pageXOffset, top);
			};
			utilities.scrollShouldBeIgnored = () => false;
			utilities.buildScrollableStyle = () => ({});
		} else {
			utilities.subscribeToScrollListener = () => {};
			utilities.unsubscribeFromScrollListener = () => {};
			utilities.nodeScrollListener = this.infiniteHandleScroll 
			utilities.getScrollTop = () => {
				let scrollable;
				if (this.refs && this.refs.scrollable) {
					scrollable = $(this.refs.scrollable);
				}
				return scrollable ? scrollable.scrollTop : 0;
			};

			utilities.setScrollTop = (top) => {
				let scrollable;
				if (this.refs && this.refs.scrollable) {
					scrollable = $(this.refs.scrollable);
				}
				if (scrollable) {
					scrollable.scrollTop = top;
				}
			};
			utilities.scrollShouldBeIgnored = event => event.target !== $(this.refs.scrollable);

			utilities.buildScrollableStyle = () => {
				return {
					height: this.computedProps.containerHeight,
					overflowX: 'hidden',
					overflowY: 'scroll',
					WebkitOverflowScrolling: 'touch'
				};
			};
		}
		return utilities;
	
	}

	recomputeInternalStateFromProps(props) {
		checkProps(props);
		let computedProps = this.generateComputedProps(props);
		let utils = this.generateComputedUtilityFunctions(props);

		let newState = {};

		newState.numberOfChildren = React.Children.count(computedProps.children);
		newState.infiniteComputer = infiniteHelpers.createInfiniteComputer(
			computedProps.elementHeight,
			computedProps.children,
			computedProps.displayBottomUpwards
		);

		if (computedProps.isInfiniteLoading !== undefined) {
			newState.isInfiniteLoading = computedProps.isInfiniteLoading;
		}

		newState.preloadBatchSize = computedProps.preloadBatchSize;
		newState.preloadAdditionalHeight = computedProps.preloadAdditionalHeight;

		newState = Object.assign(newState,
			infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(
				newState, utils.getScrollTop()));

		return {
			computedProps,
			utils,
			newState
		};
	}

	componentWillReceiveProps(nextProps) {
		let nextInternalState = this.recomputeInternalStateFromProps(nextProps);

		this.computedProps = nextInternalState.computedProps;
		this.utils = nextInternalState.utils;

		this.setState(nextInternalState.newState);
	}

	componentWillUpdate() {
		if (this.props.displayBottomUpwards) {
			this.preservedScrollState = this.utils.getScrollTop() - this.loadingSpinnerHeight;
		}
	}

	componentDidUpdate(prevProps, prevState) {
		this.loadingSpinnerHeight = this.utils.getLoadingSpinnerHeight();

		if (this.props.displayBottomUpwards) {
			let lowestScrollTop = this.getLowestPossibleScrollTop();
			if (this.shouldAttachToBottom && this.utils.getScrollTop() < lowestScrollTop) {
				this.utils.setScrollTop(lowestScrollTop);
			} else if (prevProps.isInfiniteLoading && !this.props.isInfiniteLoading) {
				this.utils.setScrollTop(this.state.infiniteComputer.getTotalScrollableHeight() -
					prevState.infiniteComputer.getTotalScrollableHeight() +
					this.preservedScrollState);
			}
		}
		if (React.Children.count(this.props.children) !== React.Children.count(prevProps.children)) {
			let newApertureState = infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(
				this.state,
				this.utils.getScrollTop()
			);
			this.setState(newApertureState);
		}
	}

	componentDidMount() {
		this.utils.subscribeToScrollListener();
		if (_.isFinite(this.computedProps.infiniteLoadBeginEdgeOffset) &&
			this.state.infiniteComputer.getTotalScrollableHeight() < this.computedProps.containerHeight) {
			this.setState({
				isInfiniteLoading: true
			});
			this.computedProps.onInfiniteLoad();
		}

		if (this.props.displayBottomUpwards) {
			let lowestScrollTop = this.getLowestPossibleScrollTop();
			if (this.shouldAttachToBottom && this.utils.getScrollTop() < lowestScrollTop) {
				this.utils.setScrollTop(lowestScrollTop);
			}
		}

		if(!this.state.optimize && this.props.delayOptimizations) setTimeout(() => { this.setState({ optimize: true }) }, this.props.delayOptimizations);
	}

	componentWillUnmount() {
		this.utils.unsubscribeFromScrollListener();
	}

	infiniteHandleScroll(e) {

		if (!this.state.optimize && this.utils.scrollShouldBeIgnored(e)) {
			return;
		}
		this.computedProps.handleScroll($(this.refs.scrollable));
		this.handleScroll(this.utils.getScrollTop());
	}

	manageScrollTimeouts() {
		// Maintains a series of timeouts to set this.state.isScrolling
		// to be true when the element is scrolling.

		if (this.state.scrollTimeout) {
			clearTimeout(this.state.scrollTimeout);
		}

		let scrollTimeout = setTimeout(() => {
			this.setState({
				isScrolling: false,
				scrollTimeout: undefined
			});
		}, this.computedProps.timeScrollStateLastsForAfterUserScrolls);

		this.setState({
			isScrolling: true,
			scrollTimeout
		});
	}

	getLowestPossibleScrollTop() {
		return this.state.infiniteComputer.getTotalScrollableHeight() - this.computedProps.containerHeight;
	}

	passedEdgeForInfiniteScroll(scrollTop) {
		if (this.computedProps.displayBottomUpwards) {
			return !this.shouldAttachToBottom && scrollTop < this.computedProps.infiniteLoadBeginEdgeOffset;
		} else {
			return scrollTop > this.state.infiniteComputer.getTotalScrollableHeight() -
				this.computedProps.containerHeight -
				this.computedProps.infiniteLoadBeginEdgeOffset;
		}
	}

	handleScroll(scrollTop) {
		this.shouldAttachToBottom = this.computedProps.displayBottomUpwards &&
			scrollTop >= this.getLowestPossibleScrollTop();

		this.manageScrollTimeouts();

		let newApertureState = infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(
			this.state,
			scrollTop
		);

		if (this.passedEdgeForInfiniteScroll(scrollTop) && !this.state.isInfiniteLoading) {
			this.setState(Object.assign({}, newApertureState, {
				isInfiniteLoading: true
			}));
			this.computedProps.onInfiniteLoad();
		} else {
			this.setState(newApertureState);
		}
	}

	buildHeightStyle(height) {
		return {
			width: '100%',
			height: Math.ceil(height)
		};
	}

	scrollTo(top) {
		$(this.refs.scrollable).scrollTop = top;
	}

	render() {

		var displayables;
		if (React.Children.count(this.computedProps.children) > 1 && this.state.optimize) {
			displayables = this.computedProps.children.slice(this.state.displayIndexStart,
				this.state.displayIndexEnd + 1);
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

		var loadingSpinner = this.computedProps.infiniteLoadBeginEdgeOffset === undefined ? null : (
	  		<div ref="loadingSpinner">
				{this.state.isInfiniteLoading ? this.computedProps.loadingSpinnerDelegate : null}
	  		</div>
		);

		// topSpacer and bottomSpacer take up the amount of space that the
		// rendered elements would have taken up otherwise
		return (
			<div 
				className={this.computedProps.className}
				ref="scrollable"
				style={this.utils.buildScrollableStyle()}
				onScroll={this.utils.nodeScrollListener.bind(this)}>

		  		<div 
		  			ref="smoothScrollingWrapper" 
		  			style={infiniteScrollStyles}>

					<div 
						ref="topSpacer" 
						style={this.buildHeightStyle(topSpacerHeight)}/>

					{this.computedProps.displayBottomUpwards && loadingSpinner}
			  		{displayables}
					{!this.computedProps.displayBottomUpwards && loadingSpinner}
					
					<div 
						ref="bottomSpacer"
				 		style={this.buildHeightStyle(bottomSpacerHeight)}/>
		  		</div>
			</div>
		);
	
	}

}


  