import { PropTypes } from 'react';

export const preloadType = (
	PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.shape({
			type: PropTypes.oneOf(['containerHeightScaleFactor']).isRequired,
			amount: PropTypes.number.isRequired
		})
	])
);

export default { preloadType };