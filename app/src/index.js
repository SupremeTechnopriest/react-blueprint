/**
 *
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { App } from 'containers';
import { DevTools } from 'components';
import store from 'stores/store';

const dest = document.getElementById('app-container');
const component = <App />;

// Enable Debugger
if (__DEVELOPMENT__) {
  window.React = React;
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
	// Dev Render
	ReactDOM.render(
		<Provider store={store}>
			<div>
				{component}
				<DevTools />
			</div>
		</Provider>,
		dest
	);
} else {
	// Production Render
	ReactDOM.render(
		<Provider store={store}>{component}</Provider>,
		dest
	);
}
