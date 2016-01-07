const markdown = `

## Removing Docs

Upon creation of your project, you will notice that these docs are rendered in your application.  
They have been included to provided some examples of usage. All the docs are located in \`src/components/Docs\`.  

To remove the docs, open the projects main index at \`src/index.js\`.

1. Remove the import of \`DocRoutes\` on line \`24\`
2. Change reference to \`DocRoutes\` to \`Routes\` on line \`42\`

When complete your new index should look as follows: 

\`\`\`
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
				<Router history={history}>{Routes}</Router>
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
\`\`\`

At this point you can safely remove the Docs directory from \`src/components\` and your app will be rendering the blank AppContainer located at \`src/containers/AppContainer\`.

`;

export default markdown;