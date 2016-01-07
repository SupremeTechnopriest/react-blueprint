import React from 'react';
import { Route } from 'react-router';

import {
	App
} from 'containers';

export default (
	<Route path="/" component={App}>
		<Route path="/link" component={App} />
	</Route>
);