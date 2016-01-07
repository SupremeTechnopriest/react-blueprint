/**
 * store.js
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { DevTools } from 'components';
import createLogger from 'redux-logger';

import { syncHistory } from 'redux-simple-router';
import { browserHistory as history } from 'react-router';

import rootReducer from 'reducers';

let middleware = syncHistory(history);

// Production Store
const createProductionStore = () => {
	return applyMiddleware(thunk, middleware)(createStore);
}

// Dev Store
const createDevelopmentStore = () => {
	return (
		compose(
			applyMiddleware(
				thunk,
				middleware,
				createLogger({ collapsed: true })
			),
			window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
		)(createStore)
	);
}

let store;

if(__DEVELOPMENT__ && __DEVTOOLS__) {
	store = createDevelopmentStore();
} else {
	store = createProductionStore();
}

if (__DEVELOPMENT__ && module.hot) {
	module.hot.accept(rootReducer, () => {
		store.replaceReducer(rootReducer);
	});
}

export default { middleware, store }
