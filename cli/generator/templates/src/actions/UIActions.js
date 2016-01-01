/**
 * Update Authenticated
 * @param  {Boolean} authenticated
 *
 */
export const UPDATE_AUTHENTICATED = 'UPDATE_AUTHENTICATED';
export const updateAuthenticated = (authenticated) => ({
    type: UPDATE_AUTHENTICATED,
    authenticated
});
