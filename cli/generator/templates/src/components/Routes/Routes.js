import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
	App
} from 'containers';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={App} />
	</Route>
);