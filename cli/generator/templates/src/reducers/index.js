import { combineReducers } from 'redux';
import { routerReducer as route }  from 'react-router-redux';
import ui from './UIReducer';

export default combineReducers({
	route,
	ui
});
