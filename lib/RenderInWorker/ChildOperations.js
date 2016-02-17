'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.actions = undefined;

var _actions;

exports.processChildrenUpdates = processChildrenUpdates;
exports.replaceNodeWithMarkupByID = replaceNodeWithMarkupByID;

var _ReactMultiChildUpdateTypes = require('react/lib/ReactMultiChildUpdateTypes');

var _ReactMultiChildUpdateTypes2 = _interopRequireDefault(_ReactMultiChildUpdateTypes);

var _IDOperations = require('./IDOperations');

var _IDOperations2 = _interopRequireDefault(_IDOperations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INSERT_MARKUP = _ReactMultiChildUpdateTypes2.default.INSERT_MARKUP;
var MOVE_EXISTING = _ReactMultiChildUpdateTypes2.default.MOVE_EXISTING;
var SET_MARKUP = _ReactMultiChildUpdateTypes2.default.SET_MARKUP;
var TEXT_CONTENT = _ReactMultiChildUpdateTypes2.default.TEXT_CONTENT;
var REMOVE_NODE = _ReactMultiChildUpdateTypes2.default.REMOVE_NODE;
var actions = exports.actions = (_actions = {}, _defineProperty(_actions, INSERT_MARKUP, function (update, components) {
    var parent = update.parentNode;
    var child = components[update.markupIndex];

    if (typeof child === 'string' || typeof child === 'number') {
        parent.setContent(child);
    } else {
        parent.appendChild(child.getPublicInstance());
    }
}), _defineProperty(_actions, MOVE_EXISTING, function () {
    console.log(MOVE_EXISTING);
}), _defineProperty(_actions, SET_MARKUP, function () {
    console.log(SET_MARKUP);
}), _defineProperty(_actions, TEXT_CONTENT, function () {
    console.log(TEXT_CONTENT);
}), _defineProperty(_actions, REMOVE_NODE, function (update, components) {
    console.log(REMOVE_NODE);
}), _actions);

function processChildrenUpdates(updates, components) {
    for (var i = 0, l = updates.length; i < l; ++i) {
        updates[i].parentNode = _IDOperations2.default.get(updates[i].parentID);
        var update = updates[i];
        actions[update.type](update, components);
    }
}

function replaceNodeWithMarkupByID(id, markup) {
    console.log(id, markup);
    var node = _IDOperations2.default.get(id);

    var nextNode = markup.getPublicInstance();
    var parentNode = node.parent;

    if (parentNode) {
        parentNode.remove(node);
        parentNode.add(nextNode);
    }
}