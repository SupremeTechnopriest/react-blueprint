import {
	UPDATE_AUTHENTICATED
} from 'actions/UIActions';

let defaultState = {
    authenticated: false,
    error: null
};

export default function UIReducer (state = defaultState, action) {
    switch (action.type) {

        case UPDATE_AUTHENTICATED:
            return Object.assign({}, state, {
                authenticated: action.authenticated
            });

        default:
            return state;
    }
}
