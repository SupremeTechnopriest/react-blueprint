const Dimensions = (element) => {

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
	    dimensions.height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	    dimensions.width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    }

  	return dimensions;

};

const isWindow = (variable) => {
	return variable && variable.document && variable.location && variable.alert && variable.setInterval;
} 

export default Dimensions;