import React, { Component } from 'react';

function defaultGetWidth (element) {
  return element.clientWidth || 1
}

function defaultGetHeight (element) {
  return element.clientHeight || 0
}

const styles = {
	width: '100%',
	height: '100%',
	padding: 0,
	border: 0
};

const getDimensions = (element) => {

	// Reject no element
    if(!element) {
    	return console.warn('Must supply an element, `window`, or `document` to Dimensions');
    }

    // Is document
    if(element.documentElement) {
    	return {
    		height: element.documentElement.clientHeight,
	        width: element.documentElement.clientWidth
    	}
    }

    let dimensions;
	
	// Is window
	if(isWindow(element)) {
		dimensions = {
	        height: element.innerHeight,
	        width: element.innerWidth
	    };
    } else {
    	dimensions = {
	        height: element.offsetHeight,
	        width: element.offsetWidth
	    };
	    let style = window.getComputedStyle(element);
	    dimensions.height += parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.borderBottomWidth) + parseInt(style.borderTopWidth);
	    dimensions.width += parseInt(style.marginLeft) + parseInt(style.marginRight) + parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);
    }

  	return dimensions;

};

const bindDimensions = (ComposedComponent, { getHeight = defaultGetHeight, getWidth = defaultGetWidth } = {}) => {

	return class extends Component {

		static displayName = 'Dimensions';

		state = {};

		updateDimensions() {

			const container = this.refs.container;

			if(!container || !Object.keys(container).length) return;
			this.setState({
				width: getWidth(container),
				height: getHeight(container)
				
			});
		}

		onResize() {
			if (this.rqf) return
			this.rqf = window.requestAnimationFrame(() => {
				this.rqf = null;
				this.updateDimensions.apply(this);
			});
		}

		componentDidMount() {
			window.addEventListener('resize', this.onResize.bind(this), false);
			setTimeout(() => {
				this.updateDimensions.apply(this);
			}, 1);
		}

		componentWillUnmount() {
			window.removeEventListener('resize', this.onResize.bind(this));
		}

		render() {
			return (
				<div style={styles} ref='container'>
					<ComposedComponent {...this.state} {...this.props}
						getDimensions={this.getDimensions.bind(this)}
						updateDimensions={this.updateDimensions.bind(this)} />
				</div>
			)
		}

		getDimensions() {
			return this.state;
		}

	}
}

const isWindow = (element) => {
	return element && element.document && element.location && element.alert && element.setInterval;
} 

const Dimensions = (element, options = {}) => {

	switch(typeof element) {
		case 'object':
			return getDimensions(element);
		case 'function':
			return bindDimensions(element);
		default:
			return;
	}
}

export default Dimensions;
