import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import {
	Router,
	browserHistory as history
} from 'react-router';

import { DevTools, Routes } from 'components';

import store from 'stores/store';
global.Store = store;

const dest = document.getElementById('app-container');

/**
 * Documentation Routes: Remove the following line
 * 
 */

import DocRoutes from './components/Docs/components/Routes';

// Enable Debugger
if (__DEVELOPMENT__) {
  window.React = React;
}

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
