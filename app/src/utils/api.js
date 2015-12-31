import _ from 'lodash';
import request from 'superagent';
import LocalStorage from './localStorage';

const base = Config.apiUrl;

/**
 * Just add your routes here.
 * example: `account.signup([params], [body]);`
 * returns a promise
 *
 */

export default {
	account: {
		signup: _generateRequest({
			token: false,
			method: 'POST',
			route: '/account/signup'
		})
	}
}

function _generateRequest(options) {
	return options.token ? (
		_requestWithToken.bind(this, options.method, options.route)
	) : (
		_publicRequest.bind(this, options.method, options.route)
	);
}

function _parameterizeRoute(route, params) {
	let parameterized = route;
	_.forEach(params, (v, k) => {
		if (typeof v === 'undefined') console.info(`warning: parameter ${k} was ${v}`);
		parameterized = parameterized.replace(':' + k, v);
	});
	return parameterized;
}

function _publicRequest(method, route, params, body) {

	if(!body) body = {};
	if(params) route = _parameterizeRoute(route, params);

	switch(method) {
		case 'GET':
		case 'PUT':
		case 'POST':
			return new Promise((resolve, reject) => {
				request(method, base + route)
					.accept('json')
					.send(body)
					.end((err, res) => {
						if(err) {
							console.warn(err);
							reject(err);
						} else {
							resolve(res.body);
						}
					});
			});
		case 'DELETE':
			return new Promise((resolve, reject) => {
				request
					.del(base + route)
					.accept('json')
					.send(body)
					.end((err, res) => {
						if(err) {
							console.warn(err);
							reject(err);
						} else {
							resolve(res.body);
						}
					});
			});
		default:
			Promise.reject('Invalid method.');
	}


}

function _requestWithToken(method, route, params, body) {

	if(!body) body = {};
	if(params) route = _parameterizeRoute(route, params);

	return new Promise((resolve, reject) => {
		LocalStorage.getToken()
			.then((token) => {
				switch(method) {
					case 'GET':
					case 'PUT':
					case 'POST':
						request(method, base + route)
							.set('Authorization', token)
							.accept('json')
							.send(body)
							.end((err, res) => {
								if(err) {
									console.warn(err);
									reject(err);
								} else {
									resolve(res.body);
								}
							});
						break;
					case 'DELETE':
						request
							.del(base + route)
							.set('Authorization', token)
							.accept('json')
							.send(body)
							.end((err, res) => {
								if(err) {
									console.warn(err);
									reject(err);
								} else {
									resolve(res.body);
								}
							});
						break;
					default:
						Promise.reject('Invalid method.');
				}
			})
			.catch((err) => {
				console.warn(err);
			});
	});

}
