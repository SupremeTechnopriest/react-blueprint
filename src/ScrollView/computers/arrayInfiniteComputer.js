import InfiniteComputer from './infiniteComputer';
import bs from '../utils/binaryIndexSearch';

export default class ArrayInfiniteComputer extends InfiniteComputer {

	prefixHeightData;

	constructor(heightData, numberOfChildren) {
		super(heightData, numberOfChildren);
		this.prefixHeightData = this.heightData.reduce((acc, next) => {
			if (acc.length === 0) {
				return [next];
			} else {
				acc.push(acc[acc.length - 1] + next);
				return acc;
			}
		}, []);
	}

	maybeIndexToIndex(index) {
		if (typeof index === 'undefined' || index === null) {
			return this.prefixHeightData.length - 1;
		} else {
			return index;
		}
	}

	getTotalScrollableHeight() {
		var length = this.prefixHeightData.length;
		return length === 0 ? 0 : this.prefixHeightData[length - 1];
	}

	getDisplayIndexStart(windowTop) {
		var foundIndex = bs.binaryIndexSearch(this.prefixHeightData, windowTop, bs.opts.CLOSEST_HIGHER);
		return this.maybeIndexToIndex(foundIndex);
	}

	getDisplayIndexEnd(windowBottom) {
		var foundIndex = bs.binaryIndexSearch(this.prefixHeightData, windowBottom, bs.opts.CLOSEST_HIGHER);
		return this.maybeIndexToIndex(foundIndex);
	}

	getTopSpacerHeight(displayIndexStart) {
		var previous = displayIndexStart - 1;
		return previous < 0 ? 0 : this.prefixHeightData[previous];
	}

	getBottomSpacerHeight(displayIndexEnd) {
		if (displayIndexEnd === -1) {
			return 0;
		}
		return this.getTotalScrollableHeight() - this.prefixHeightData[displayIndexEnd];
	}
}