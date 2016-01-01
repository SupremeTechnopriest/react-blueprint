import { combineReducers } from 'redux';
import { routeReducer as route }  from 'redux-simple-router';
import ui from './UIReducer';

export default combineReducers({
	route,
	ui
});
