'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default Channel Class
 */

var Channel = function () {
    function Channel(channel) {
        _classCallCheck(this, Channel);

        this.channel = channel;
    }

    _createClass(Channel, [{
        key: 'send',
        value: function send(type, args) {
            this.channel.postMessage(JSON.stringify({
                type: type, args: args
            }));
        }
    }, {
        key: 'onMessage',
        value: function onMessage(handler) {
            this.channel.addEventListener('message', function (e) {
                handler(JSON.parse(e.data));
            });
        }
    }]);

    return Channel;
}();

exports.default = Channel;