'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ReactMultiChild = require('react/lib/ReactMultiChild');

var _ReactMultiChild2 = _interopRequireDefault(_ReactMultiChild);

var _DOMNodeStub = require('./DOMNodeStub');

var _DOMNodeStub2 = _interopRequireDefault(_DOMNodeStub);

var _IDOperations = require('./IDOperations');

var _IDOperations2 = _interopRequireDefault(_IDOperations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Function to separate event Handlers and regular props
 * @param  {Object} props Props passed to a React Component
 * @return {eventHandlers: {}, options: {}}       An object containing eventHandlers and options
 */
function extractEventHandlers(props) {
    var result = {
        eventHandlers: {},
        options: {}
    };
    for (var key in props) {
        if (typeof props[key] === 'function') {
            result.eventHandlers[key] = props[key];
        } else {
            result.options[key] = props[key];
        }
    }
    return result;
}

/**
 * Renders the given react element with webworkers.
 *
 * @constructor RenderInWorker
 * @extends ReactMultiChild
 */

var RenderInWorker = function () {
    function RenderInWorker(tag) {
        _classCallCheck(this, RenderInWorker);

        this._tag = tag.toLowerCase();
        this._renderedChildren = null;
        this._previousStyle = null;
        this._previousStyleCopy = null;
        this._rootNodeID = null;
        this._wrapperState = null;
        this._topLevelWrapper = null;
        this._nodeWithLegacyProperties = null;
    }

    _createClass(RenderInWorker, [{
        key: 'construct',
        value: function construct(props) {
            this._currentElement = element;
        }

        /**
         * Mounting the root component.
         *
         * @internal
         * @param  {string} rootID - The root ID for this node.
         * @param  {ReactReconcileTransaction} transaction
         * @param  {object} context
         */

    }, {
        key: 'mountComponent',
        value: function mountComponent(rootID, transaction, context) {
            this._rootNodeID = rootID;

            var node = this.mountNode(_IDOperations2.default.getParent(rootID), this._currentElement);

            _IDOperations2.default.add(rootID, node);

            // Mounting children
            var childrenToUse = this._currentElement.props.children;
            childrenToUse = childrenToUse === null ? [] : [].concat(childrenToUse);

            if (childrenToUse.length) {
                this.mountChildren(childrenToUse, transaction, context);
            }

            // Rendering the rootNode
            _IDOperations2.default.rootNode.render();
            return this;
        }

        /**
         * Mounting the node itself.
         *
         * @param   {Node}          parent  - The parent node.
         * @param   {ReactElement}  element - The element to mount.
         * @return  {Node}                  - The mounted node.
         */

    }, {
        key: 'mountNode',
        value: function mountNode(parent, element) {
            var props = element.props;
            var type = element.type;var children = props.children;

            var restProps = _objectWithoutProperties(props, ['children']);

            var _extractEventHandlers = extractEventHandlers(restProps);

            var eventHandlers = _extractEventHandlers.eventHandlers;
            var options = _extractEventHandlers.options;

            var node = new _DOMNodeStub2.default(this._rootNodeID, type, options);
            node.addEventHandlers(eventHandlers);
            parent.appendChild(node);

            return node;
        }

        /**
         * Receive a component update.
         *
         * @param {ReactElement}              nextElement
         * @param {ReactReconcileTransaction} transaction
         * @param {object}                    context
         * @internal
         * @overridable
         */

    }, {
        key: 'receiveComponent',
        value: function receiveComponent(nextElement, transaction, context) {
            var _nextElement$props = nextElement.props;
            var children = _nextElement$props.children;
            var restProps = _objectWithoutProperties(_nextElement$props, ['children']);
            var _extractEventHandlers2 = extractEventHandlers(restProps);

            var eventHandlers = _extractEventHandlers2.eventHandlers;
            var options = _extractEventHandlers2.options;


            var node = _IDOperations2.default.get(this._rootNodeID);

            node.setAttributes(options);
            node.addEventHandlers(eventHandlers);

            this.updateChildren(children, transaction, context);
            //IDOperations.rootNode.render(); <- No real need to update the parent also
            return this;
        }

        /**
         * Dropping the component.
         */

    }, {
        key: 'unmountComponent',
        value: function unmountComponent() {
            this.unmountChildren();

            var node = _IDOperations2.default.get(this._rootNodeID);
            node.destroy();

            _IDOperations2.default.drop(this._rootNodeID);

            this._rootNodeID = null;

            _IDOperations2.default.rootNode.render();
        }

        /**
         * Getting a public instance of the component for refs.
         *
         * @return {Node} - The instance's node.
         */

    }, {
        key: 'getPublicInstance',
        value: function getPublicInstance() {
            return _IDOperations2.default.get(this._rootNodeID);
        }
    }]);

    return RenderInWorker;
}();

/**
 * Extending the component with the MultiChild mixin.
 */


exports.default = RenderInWorker;
Object.assign(RenderInWorker.prototype, _ReactMultiChild2.default.Mixin);