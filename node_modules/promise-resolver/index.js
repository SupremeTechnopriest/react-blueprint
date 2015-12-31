'use strict';
module.exports = makeResolver;
module.exports.defer = defer;

function makeResolver(resolve, reject, cb) {
	return function (err, result) {
		if (err && reject) {
			reject(err);
		} else if (resolve) {
			resolve(result);
		}
		if (cb) {
			cb.apply(null, arguments);
		}
	};
}

function defer(cb, Promise) {
	Promise = Promise || global.Promise;
	var obj = {};
	obj.promise = new Promise(function (resolve, reject) {
		obj.resolve = resolve;
		obj.reject = reject;
		obj.cb = makeResolver(resolve, reject, cb);
	});
	return obj;
}
