/**
 * store.js
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { DevTools } from 'components';
import createLogger from 'redux-logger';

import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from 'reducers';
import { getHydratedState } from 'utils/localStorage';

const middleware = routerMiddleware(browserHistory);

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

store = store(rootReducer, getHydratedState());
middleware(store, state => state.route);

export default store;
