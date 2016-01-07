// This module provides a centralized place for
// runtime checking that the props passed to React Infinite
// make the minimum amount of sense.

import React from 'react';
import _isFinite from 'lodash.isfinite';

// var React = global.React || require('react');
// var _isFinite = require('lodash.isfinite');

const checkProps = (props) => {
    
    let invariant = 'Invariant Violation: ';

    if (!(props.containerHeight || props.useWindowAsScrollContainer)) {
        throw new Error(invariant + 'Either containerHeight or useWindowAsScrollContainer must be provided.');
    }

    if (props.optimizeRendering && !(_isFinite(props.elementHeight) || Array.isArray(props.elementHeight))) {
        throw new Error(invariant + 'You must provide either a number or an array of numbers as the elementHeight.');
    }

    if (Array.isArray(props.elementHeight)) {
        if (React.Children.count(props.children) !== props.elementHeight.length) {
            throw new Error(invariant + 'There must be as many values provided in the elementHeight prop as there are children.');
        }
    }
}

export default checkProps;