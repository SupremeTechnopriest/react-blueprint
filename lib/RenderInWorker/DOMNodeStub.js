'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WorkerBridge = require('./WorkerBridge');

var _WorkerBridge2 = _interopRequireDefault(_WorkerBridge);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkerDomNodeStub = function () {
    function WorkerDomNodeStub(id, el, options) {
        _classCallCheck(this, WorkerDomNodeStub);

        this.el = el;
        this.options = options;
        this.eventHandlers = {};
        this.id = id;
        this.impl(_constants.CONSTRUCTOR, [this.el, this.options]);
    }

    _createClass(WorkerDomNodeStub, [{
        key: 'appendChild',
        value: function appendChild(node) {
            this.impl(_constants.APPEND_CHILD, [node.id]);
        }
    }, {
        key: 'setContent',
        value: function setContent(content) {
            this.impl(_constants.SET_CONTENT, [content]);
        }
    }, {
        key: 'setAttributes',
        value: function setAttributes(options) {
            this.impl(_constants.SET_ATTRIBUTES, [options]);
        }
    }, {
        key: 'addEventHandlers',
        value: function addEventHandlers(handlers) {
            var canSend = false;
            for (var key in handlers) {
                canSend = true;
                this.eventHandlers[key] = handlers[key];
            }
            if (canSend) {
                this.impl(_constants.ADD_EVENT_HANDLERS, Object.keys(handlers));
            }
        }
    }, {
        key: 'on',
        value: function on(eventName, e) {
            var fn = this.eventHandlers[eventName];
            if (typeof fn === 'function') {
                fn.call(this, e);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            this.impl(_constants.RENDER);
        }
    }, {
        key: 'impl',
        value: function impl(method) {
            var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            // Sends a messages to the Implementation
            _WorkerBridge2.default.postMessage({
                method: method,
                args: args,
                id: this.id
            });
        }
    }]);

    return WorkerDomNodeStub;
}();

exports.default = WorkerDomNodeStub;