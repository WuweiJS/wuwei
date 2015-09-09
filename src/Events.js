/**
 * Enum Events
 */

var UPDATE = Symbol('SOURCES'),
    TEARDOWN = Symbol('TEARDOWN'),
    ADD_ITEM = Symbol('ADD_ITEM'),
    DELETE_ITEM = Symbol('DELETE_ITEM'),
    ITEM_UPDATE = Symbol('ITEM_UPDATE');

export default {
  UPDATE: UPDATE,
  TEARDOWN: TEARDOWN,
  ADD_ITEM: ADD_ITEM,
  DELETE_ITEM: DELETE_ITEM,
  ITEM_UPDATE: ITEM_UPDATE
};
