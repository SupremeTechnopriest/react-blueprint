'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IDOperations = require('./IDOperations');

var _IDOperations2 = _interopRequireDefault(_IDOperations);

var _DomNodeStub = require('./DomNodeStub');

var _DomNodeStub2 = _interopRequireDefault(_DomNodeStub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactWWTextComponent = function () {
    function ReactWWTextComponent(props) {
        _classCallCheck(this, ReactWWTextComponent);
    }

    _createClass(ReactWWTextComponent, [{
        key: 'construct',
        value: function construct(text) {
            this._currentElement = text;
            this._rootNodeID = null;
        }
    }, {
        key: 'mountComponent',
        value: function mountComponent(rootID, transaction, context) {
            this._rootNodeID = rootID;
            var parent = _IDOperations2.default.getParent(this._rootNodeID);
            var node = new _DomNodeStub2.default(this._rootNodeID, '#text', {
                value: this._currentElement
            });
            parent.appendChild(node);
            _IDOperations2.default.add(this._rootNodeID, node);
            return node;
        }
    }, {
        key: 'receiveComponent',
        value: function receiveComponent(nextText, transaction) {
            if (this._currentElement !== nextText) {
                this._currentElement = nextText;
                var node = _IDOperations2.default.get(this._rootNodeID);
                node.setContent(this._currentElement);
            }
            return this;
        }
    }, {
        key: 'unmountComponent',
        value: function unmountComponent() {
            // Nothing really to do, since this just sets the content
        }
    }, {
        key: 'getPublicInstance',
        value: function getPublicInstance() {
            return this._currentElement;
        }
    }]);

    return ReactWWTextComponent;
}();

exports.default = ReactWWTextComponent;