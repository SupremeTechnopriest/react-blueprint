'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkerBridge = function () {
    function WorkerBridge() {
        _classCallCheck(this, WorkerBridge);

        this.queue = [];
        this.channel = new _channel2.default(self);
        this.channel.onMessage(this.handleMessage.bind(this));
        this.pollQueue();
        this.TIMEOUT = 5;
    }

    _createClass(WorkerBridge, [{
        key: 'pollQueue',
        value: function pollQueue() {
            var _this = this;

            self.setTimeout(function () {
                _this.flushQueue();
                _this.pollQueue();
            }, this.TIMEOUT);
        }
    }, {
        key: 'handleMessage',
        value: function handleMessage(data) {
            switch (data.type) {
                case _constants.EVENT:
                    handleEvent(data.args);
                    break;
                case _constants.RENDER_TIME:
                    this.rate = data.args.count / data.args.time;
                    break;
                default:
                    console.log('Unknown operation %s', data);
            }
        }
    }, {
        key: 'postMessage',
        value: function postMessage(msg) {
            this.queue.push(msg);
        }
    }, {
        key: 'flushQueue',
        value: function flushQueue() {
            if (this.queue.length === 0) {
                return;
            }
            this.channel.send(_constants.RENDER_QUEUE, this.queue);
            this.queue = [];
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(args) {
            // TODO - Pass the events to the appropriate nodes/event Handlers
            console.log(args);
        }
    }]);

    return WorkerBridge;
}();

exports.default = new WorkerBridge();