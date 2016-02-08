// Message types passed between worker and UI Thread
export const EVENT = 'event';
export const RENDER_TIME = 'render_time';
export const RENDER = 'render';

// Operations to be performed while rendering
export const RENDER_QUEUE = 'renderQueue';
export const CONSTRUCTOR = 'constructor';
export const APPEND_CHILD = 'appendChild'; 
export const SET_CONTENT = 'setContent';
export const SET_ATTRIBUTES = 'setAttributes';
export const ADD_EVENT_HANDLERS = 'addEventListeners';

// Other constants
export const MAX_QUEUE_SIZE = 500;