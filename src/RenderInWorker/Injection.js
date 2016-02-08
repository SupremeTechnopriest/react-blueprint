/**
 * Injecting the renderer's needed dependencies into React's internals.
 */
import ReactInjection from 'react/lib/ReactInjection';
import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment';

import ReconcileTransaction from './ReconcileTransaction';
import RenderInWorker from './RenderInWorker';
import TextComponent from './TextComponent';

import { processChildrenUpdates, replaceNodeWithMarkupByID } from './ChildOperations';

export default function inject() {

    ReactInjection.NativeComponent.injectGenericComponentClass(
        RenderInWorker
    );

    ReactInjection.Updates.injectReconcileTransaction(
        ReconcileTransaction
    );

    ReactInjection.NativeComponent.injectTextComponentClass(
        TextComponent
    );

    ReactInjection.EmptyComponent.injectEmptyComponent('element');

    ReactComponentEnvironment.processChildrenUpdates = processChildrenUpdates;
    ReactComponentEnvironment.replaceNodeWithMarkupByID = replaceNodeWithMarkupByID;
}