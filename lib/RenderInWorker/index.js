'use strict';

var _ReactInstanceHandles = require('react/lib/ReactInstanceHandles');

var _ReactInstanceHandles2 = _interopRequireDefault(_ReactInstanceHandles);

var _ReactElement = require('react/lib/ReactElement');

var _ReactElement2 = _interopRequireDefault(_ReactElement);

var _ReactUpdates = require('react/lib/ReactUpdates');

var _ReactUpdates2 = _interopRequireDefault(_ReactUpdates);

var _instantiateReactComponent = require('react/lib/instantiateReactComponent');

var _instantiateReactComponent2 = _interopRequireDefault(_instantiateReactComponent);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Injection = require('./Injection');

var _Injection2 = _interopRequireDefault(_Injection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Injecting dependencies.
 */
(0, _Injection2.default)();

/**
 * Renders the given react element using a web worker.
 *
 * @param  {ReactElement}   element   - Node to update.
 * @return {ReactComponent}           - The rendered component instance.
 */
function render(element) {
    // Is the given element valid?
    (0, _invariant2.default)(_ReactElement2.default.isValidElement(element), 'render(): You must pass a valid ReactElement.');

    var id = _ReactInstanceHandles2.default.createReactRootID(); // Creating a root id & creating the screen
    var component = (0, _instantiateReactComponent2.default)(element); // Mounting the app
    var transaction = _ReactUpdates2.default.ReactReconcileTransaction.getPooled();

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.
    _ReactUpdates2.default.batchedUpdates(function () {
        transaction.perform(function () {
            component.mountComponent(id, transaction, {});
        });
        _ReactUpdates2.default.ReactReconcileTransaction.release(transaction);
    });

    return component._instance;
}

module.exports = {
    render: render
};