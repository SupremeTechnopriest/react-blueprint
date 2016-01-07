
export const exampleDecorator = (target, key, descriptor, options = {}) => {
	target.options = options;
	return target;
}
