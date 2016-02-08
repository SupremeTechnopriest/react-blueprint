'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = inject;

var _ReactInjection = require('react/lib/ReactInjection');

var _ReactInjection2 = _interopRequireDefault(_ReactInjection);

var _ReactComponentEnvironment = require('react/lib/ReactComponentEnvironment');

var _ReactComponentEnvironment2 = _interopRequireDefault(_ReactComponentEnvironment);

var _ReconcileTransaction = require('./ReconcileTransaction');

var _ReconcileTransaction2 = _interopRequireDefault(_ReconcileTransaction);

var _RenderInWorker = require('./RenderInWorker');

var _RenderInWorker2 = _interopRequireDefault(_RenderInWorker);

var _TextComponent = require('./TextComponent');

var _TextComponent2 = _interopRequireDefault(_TextComponent);

var _ChildOperations = require('./ChildOperations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Injecting the renderer's needed dependencies into React's internals.
 */
function inject() {

    _ReactInjection2.default.NativeComponent.injectGenericComponentClass(_RenderInWorker2.default);

    _ReactInjection2.default.Updates.injectReconcileTransaction(_ReconcileTransaction2.default);

    _ReactInjection2.default.NativeComponent.injectTextComponentClass(_TextComponent2.default);

    _ReactInjection2.default.EmptyComponent.injectEmptyComponent('element');

    _ReactComponentEnvironment2.default.processChildrenUpdates = _ChildOperations.processChildrenUpdates;
    _ReactComponentEnvironment2.default.replaceNodeWithMarkupByID = _ChildOperations.replaceNodeWithMarkupByID;
}