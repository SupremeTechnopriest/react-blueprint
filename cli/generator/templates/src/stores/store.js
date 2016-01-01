/**
 * store.js
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { DevTools } from 'components';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';

// Production Store
const createStoreWithMiddleware = () => {
	return applyMiddleware(thunk)(createStore);
}

// Dev Store
const composeStore = () => {
	return (
		compose(
			applyMiddleware(
				thunk,
				createLogger({ collapsed: true })
			),
			window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
		)(createStore)
	);
}

let store;

if(__DEVELOPMENT__ && __DEVTOOLS__) {
	store = composeStore();
} else {
	store = createStoreWithMiddleware();
}

if (__DEVELOPMENT__ && module.hot) {
	module.hot.accept(rootReducer, () => {
		store.replaceReducer(rootReducer);
	});
}

export default store;
