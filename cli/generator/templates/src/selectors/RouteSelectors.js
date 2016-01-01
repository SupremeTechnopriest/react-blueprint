import { createSelector } from 'reselect';

export const route$ = state => state.route;

export const path$ = createSelector(route$, (route) => {
    return {
        path: route.path
    }
});
