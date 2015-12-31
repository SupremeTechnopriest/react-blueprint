import { createSelector } from 'reselect';

// account-wide selector
export const ui$ = state => state.ui;

export const authenticated$ = createSelector(ui$, (ui) => {
    return {
        authenticated: ui.authenticated
    }
});

export const error$ = (state) => {
    return {
        error: state.ui.error
    }
};
