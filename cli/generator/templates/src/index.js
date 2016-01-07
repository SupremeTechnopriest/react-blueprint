import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import {
	Router,
	browserHistory as history
} from 'react-router';

import { App } from 'containers';
import { DevTools, Routes } from 'components';

import { getHydratedState } from 'utils/localStorage';
import Store from 'stores/Store';
import rootReducer from 'reducers';

/**
 * Documentation Routes: Remove the following line
 * 
 */

import DocRoutes from './components/Docs/components/Routes';

const store = Store(rootReducer, getHydratedState());
const dest = document.getElementById('app-container');


// Enable Debugger
if (__DEVELOPMENT__) {
  window.React = React;
}

syncReduxAndRouter(history, store, state => state.route);

if (__DEVTOOLS__ && !window.devToolsExtension) {
	// Dev Render
	render(
		<Provider store={store}>
			<div>
				<Router history={history}>{DocRoutes}</Router>
				<DevTools />
			</div>
		</Provider>,
		dest
	);
} else {
	// Production Render
	render(
		<Provider store={store}>
			<Router history={history}>{Routes}</Router>
		</Provider>,
		dest
	);
}
