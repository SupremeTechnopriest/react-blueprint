import DOMNodeStub from './DOMNodeStub';

const nodes = {};

/**
 * Backend for ID operations.
 */
class IDOperations {
    constructor() {
        this.rootNode = new DOMNodeStub('0', 'div', {});
    }

    add(ID, node) {
        nodes[ID] = node;
        return this;
    }
    get(ID) {
        return nodes[ID];
    }
    drop(ID) {
        delete nodes[ID];
        return this;
    }

    getParent(ID) {
        // If the node is root, we return the rootNode itself
        if (ID.match(/\./g).length === 1)
            return this.rootNode;

        const parentID = ID.split('.').slice(0, -1).join('.');
        return this.get(parentID);
    }
}

export default new IDOperations();