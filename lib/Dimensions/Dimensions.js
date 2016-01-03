"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Dimensions = function Dimensions(element) {

    if (!element) return;

    var dimensions = {
        height: element.offsetHeight,
        width: element.offsetWidth
    },
        style = window.getComputedStyle(element);

    dimensions.height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    dimensions.width += parseInt(style.marginLeft) + parseInt(style.marginRight);

    return dimensions;
};

exports.default = Dimensions;