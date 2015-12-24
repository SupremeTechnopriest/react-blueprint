/**
 * localStorage.js
 * Wrapper around the browsers localStorage mechanism
 *
 */

const prefix = Config.localStorageKey;
const Store = window.localStorage;

export default {
	get,
	set,
	remove,
	getHydratedState,
	setHydratedState,
	addHydratedState
};

/**
 * Gets an item from localStorage
 * @param  {string} id
 *
 */
export const get = (id) => {
	try {
		return JSON.parse(Store.getItem(`${prefix}${id}`)).value;
	} catch(err) {
		return null;
	}
}

/**
 * Sets an item in localStorage
 * @param  {String} id
 * @param  {Any}    value
 *
 */
export const set = (id, value)  => {
	return Store.setItem(`${prefix}${id}`, JSON.stringify({ value }));
}

/**
 * Remove item from localStorage
 * @param  {String} id
 *
 */
export const remove = (id)  => {
	return Store.removeItem(`${prefix}${id}`);
}

/**
 * Return state to rehydrate store
 * @return {Object}
 *
 */
export const getHydratedState = () => {
	let state = get('state');
	return state ? state : {};
};

/**
 * Sets the hydrated state
 * @param  {Object} state
 *
 */
export const setHydratedState = (state) => {
	return set('state', state);
};

/**
 * Adds a key to hydrated state
 * @param  {String} id
 * @param  {Any}	value
 */
export const addHydratedState = (id, value) => {
	return set('state', Object.assign({}, getHydratedState(), { id: value }));
};
