/**
 * Enum Events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var UPDATE = Symbol('SOURCES'),
    TEARDOWN = Symbol('TEARDOWN'),
    ADD_ITEM = Symbol('ADD_ITEM'),
    DELETE_ITEM = Symbol('DELETE_ITEM'),
    ITEM_UPDATE = Symbol('ITEM_UPDATE');

exports['default'] = {
  UPDATE: UPDATE,
  TEARDOWN: TEARDOWN,
  ADD_ITEM: ADD_ITEM,
  DELETE_ITEM: DELETE_ITEM,
  ITEM_UPDATE: ITEM_UPDATE
};
module.exports = exports['default'];