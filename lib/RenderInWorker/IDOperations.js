'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DOMNodeStub = require('./DOMNodeStub');

var _DOMNodeStub2 = _interopRequireDefault(_DOMNodeStub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodes = {};

/**
 * Backend for ID operations.
 */

var IDOperations = function () {
    function IDOperations() {
        _classCallCheck(this, IDOperations);

        this.rootNode = new _DOMNodeStub2.default('0', 'div', {});
    }

    _createClass(IDOperations, [{
        key: 'add',
        value: function add(ID, node) {
            nodes[ID] = node;
            return this;
        }
    }, {
        key: 'get',
        value: function get(ID) {
            return nodes[ID];
        }
    }, {
        key: 'drop',
        value: function drop(ID) {
            delete nodes[ID];
            return this;
        }
    }, {
        key: 'getParent',
        value: function getParent(ID) {
            // If the node is root, we return the rootNode itself
            if (ID.match(/\./g).length === 1) return this.rootNode;

            var parentID = ID.split('.').slice(0, -1).join('.');
            return this.get(parentID);
        }
    }]);

    return IDOperations;
}();

exports.default = new IDOperations();