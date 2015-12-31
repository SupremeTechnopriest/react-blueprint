import SockJS from 'sockjs-client';
import { localStorage } from 'utils';
import Store from 'stores/store';

// Import your actions here
import { UIActions } from 'actions';

/**
 * Holds the currently connected socket.
 *
 */
let _current_socket = null;

/**
 * Public method to connect to a websocket provider.
 * The endpoint is stored in the config file.
 *
 * @param  {String} session_id
 *
 */
export const connect = (session_id) => {

	if(_current_socket) {
		_current_socket.close();
		_current_socket = null;
	}

	_current_socket = new SockJS(Config.socketUrl, null, {
		sessionId: () => session_id
	});

	_setupEvents(_current_socket);

};

/**
 * Public method to send a socket message
 *
 * @param  {String} channel
 * @param  {String} action
 * @param  {Object} data
 *
 */
export const send = (channel, action, data) => {
	_current_socket.send(JSON.stringify({
		payload: { channel, action, data }
	}));
}

export default { connect, send };


/**
 * Sets up the socket events.  This is where
 * you would perform authentication and/or handling
 * of multiple sockets.
 *
 * @param  {Object} socket
 *
 */
function _setupEvents(socket) {

	socket.onopen = () => {
		console.info('Socket open.');

		// Example Authentication
		// let token = JSON.parse(LocalStorage.get('token')).token;
		// send('TOKEN', 'VERIFY', { token });

	};
	socket.onmessage = (message) => {
		_handleMessage(message);
	};
	socket.onclose = () => {
		console.info('Socket closed.');
	}

}

/**
 * Handles incomming socket messages and
 * dispatches the appropriate action
 *
 * @param  {String} 		message 	Stringified JSON
 * @return {Redux.action}
 *
 */
function _handleMessage(message) {

	let data = JSON.parse(message.data);

	// Switch on channel
	switch(data.channel) {

		case 'NOTIFICATION':

			// Switch on action
			switch(data.action) {
				case 'AUTH':
					// Dispatch action
					Store.dispatch(UIActions.authenticated(true));
					break;
				default:
			}
			break;

		default:
			// do nothing

	}

};
