'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Message types passed between worker and UI Thread
var EVENT = exports.EVENT = 'event';
var RENDER_TIME = exports.RENDER_TIME = 'render_time';
var RENDER = exports.RENDER = 'render';

// Operations to be performed while rendering
var RENDER_QUEUE = exports.RENDER_QUEUE = 'renderQueue';
var CONSTRUCTOR = exports.CONSTRUCTOR = 'constructor';
var APPEND_CHILD = exports.APPEND_CHILD = 'appendChild';
var SET_CONTENT = exports.SET_CONTENT = 'setContent';
var SET_ATTRIBUTES = exports.SET_ATTRIBUTES = 'setAttributes';
var ADD_EVENT_HANDLERS = exports.ADD_EVENT_HANDLERS = 'addEventListeners';

// Other constants
var MAX_QUEUE_SIZE = exports.MAX_QUEUE_SIZE = 500;