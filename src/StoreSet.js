/**
 * StoreSet
 */

import { EventEmitter }    from 'events'
import   Immutable         from 'immutable'

var EVENT_EMITTER  = Symbol('EVENT_EMITTER'),
    NAME           = Symbol('NAME'),

    SET_SOURCE     = Symbol('SET_SOURCE'),
    ITEM_SOURCES   = Symbol('ITEM_SOURCES'),

    ITEM_SET       = Symbol('ITEM_SET'),
    ITEM_CLASS     = Symbol('ITEM_CLASS'),

    ON_CREATE      = Symbol('ON_CREATE'),
    VALUE          = Symbol('VALUE'),

    CURRENT_ID     = Symbol('CURRENT_ID'),

    ADD_ITEM       = 'ADD_ITEM',
    todoList    = 'todoList',
    ITEM_UPDATE    = 'ITEM_UPDATE',
    UPDATE         = 'UPDATE';


class StoreSet {
  constructor($store, setName) {

    // Private variables
    this[EVENT_EMITTER]  = new EventEmitter();
    this[NAME]           = setName;

    this[SET_SOURCE]     = null;
    this[ITEM_SOURCES]   = [];

    this[ITEM_SET]       = new Set();;

    this[CURRENT_ID]     = 0;

    this[VALUE]          = Immutable.Map({});

    // Public variables
    this.$store          = $store;
    this.type            = 'StoreSet';
  }

  getEventEmitter() {
    return this[EVENT_EMITTER];
  }

  setReduceCallback(_callback) {
    this[EVENT_EMITTER]
      .on(ADD_ITEM, _callback.bind(this));
    this[EVENT_EMITTER]
      .on(todoList, _callback.bind(this));
    this[EVENT_EMITTER]
      .on(ITEM_UPDATE, _callback.bind(this));
  }

  setValue(object) {
    var existStore  = this[VALUE],
        newStore    = Immutable.Map(object),
        mergedStore = existStore.merge(newStore);

    if (existStore !== mergedStore) {
      this[VALUE] = mergedStore;

      // Trigger UPDATE event to children stores and notify subscribed view.
      this[EVENT_EMITTER].emit(UPDATE, this.getValue());
    }

    return this;
  }

  getValue() {
    return this[VALUE].toObject();
  }

  itemClass(itemClass) {
    this[ITEM_CLASS]     = itemClass;

    return this;
  }

  itemBelongsTo(setName) {
    this[SET_SOURCE] = this.$store[setName];
    this[SET_SOURCE].getEventEmitter()
      .on(ADD_ITEM, (sourceItem) => {
        this.add(sourceItem);
      });

    return this;
  }

  itemSource() {
    this[ITEM_SOURCES] =
      Array.prototype.slice.call(arguments)

    return this;
  }

  notifyItemUpdate() {
    this[EVENT_EMITTER].emit(ITEM_UPDATE);
  }

  add(sourceItem = null) {
    let itemClass = this[ITEM_CLASS],
        itemName  = `${this[NAME]}_${this.generateId()}`,
        item      = this.$store.create(itemName, itemClass, this);

    if (sourceItem) {
      item.source(...[sourceItem.getName(), ...this[ITEM_SOURCES]]);
    } else {
      item.source(...this[ITEM_SOURCES]);
    }

    item.subscribe(() => {
      this.notifyItemUpdate();
    });

    this[ITEM_SET].add(item);
    this[EVENT_EMITTER].emit(ADD_ITEM, item);

    return item;
  }

  delete(item) {
    this[ITEM_SET].delete(item);
    this[EVENT_EMITTER].emit(todoList, item);
    item.teardown();
  }

  generateId() {
    return this[CURRENT_ID]++;
  }

  size() {
    return this[ITEM_SET].size;
  }

  toArray() {
    var array = []
    this[ITEM_SET].forEach((item) => {
      array.push(item);
    });
    return array;
  }

  at(index) {
    return this.toArray()[index];
  }

  deleteAt(index) {
    this.delete(this.toArray()[index]);
  }

  subscribe(_callback) {
    if (_callback) {
      this[EVENT_EMITTER].on(UPDATE, _callback);
      return this.getValue();
    } else {
      return {
        bind: (reactComponent) => {
          return {
            state: (stateKey) => {
              let subscribeCallback = (value) => {
                if (reactComponent) {
                  let state = {};
                  state[stateKey] = value;
                  reactComponent.setState(state);
                } else {
                  this[EVENT_EMITTER].removeListener(UPDATE, subscribeCallback);
                }
              }

              this[EVENT_EMITTER].on(UPDATE, subscribeCallback);

              return this.getValue();
            }
          }
        }
      }
    }
  }
}

export default StoreSet;
