"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var opts = exports.opts = {
	CLOSEST_LOWER: 1,
	CLOSEST_HIGHER: 2
};

var binaryIndexSearch = exports.binaryIndexSearch = function binaryIndexSearch(array, item, opt) {
	var index = void 0;

	var high = array.length - 1,
	    low = 0,
	    middle = void 0,
	    middleItem = void 0;

	while (low <= high) {
		middle = low + Math.floor((high - low) / 2);
		middleItem = array[middle];

		if (middleItem === item) {
			return middle;
		} else if (middleItem < item) {
			low = middle + 1;
		} else if (middleItem > item) {
			high = middle - 1;
		}
	}

	if (opt === opts.CLOSEST_LOWER && low > 0) {
		index = low - 1;
	} else if (opt === opts.CLOSEST_HIGHER && high < array.length - 1) {
		index = high + 1;
	}

	return index;
};

exports.default = { binaryIndexSearch: binaryIndexSearch, opts: opts };