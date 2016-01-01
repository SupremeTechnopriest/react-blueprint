/**
 *
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';
import {
	Router,
	Route,
	browserHistory as history
} from 'react-router';

import { App } from 'containers';
import { DevTools } from 'components';

import { getHydratedState } from 'utils/localStorage';
import Store from 'stores/Store';
import rootReducer from 'reducers';


const store = Store(rootReducer, getHydratedState());
const dest = document.getElementById('app-container');


const routes = (

	<Route path="/" component={App}>
		<Route path="/link" component={App} />
	</Route>
);

// Enable Debugger
if (__DEVELOPMENT__) {
  window.React = React;
}

syncReduxAndRouter(history, store, state => state.route);

if (__DEVTOOLS__ && !window.devToolsExtension) {
	// Dev Render
	ReactDOM.render(
		<Provider store={store}>
			<div>
				<Router history={history}>{routes}</Router>
				<DevTools />
			</div>
		</Provider>,
		dest
	);
} else {
	// Production Render
	ReactDOM.render(
		<Provider store={store}>
			<Router history={history}>{routes}</Router>
		</Provider>,
		dest
	);
}
