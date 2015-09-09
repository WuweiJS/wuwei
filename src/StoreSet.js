/**
 * StoreSet
 */

import StoreBase from './StoreBase'
import { UPDATE, ADD_ITEM, DELETE_ITEM, ITEM_UPDATE } from './Events'

var SET_SOURCE   = Symbol('SET_SOURCE'),
    ITEM_CLASS   = Symbol('ITEM_CLASS'),
    ITEM_SOURCES = Symbol('ITEM_SOURCES'),
    ITEM_SET     = Symbol('ITEM_SET'),
    CURRENT_ID   = Symbol('CURRENT_ID');

class StoreSet extends StoreBase {
  constructor($store, setName) {
    super(setName);

    // Private variables
    this[SET_SOURCE]   = null;
    this[ITEM_CLASS]   = null;
    this[ITEM_SOURCES] = [];
    this[ITEM_SET]     = new Set();;
    this[CURRENT_ID]   = 0;

    // Public variables
    this.$store        = $store;
    this.type          = 'StoreSet';
  }

  itemClass(itemClass) {
    this[ITEM_CLASS]     = itemClass;

    return this;
  }

  itemMapFrom(setName) {
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
    this.getEventEmitter().emit(ITEM_UPDATE);
  }

  add(sourceItem = null) {
    let itemClass = this[ITEM_CLASS],
        itemName  = `${this.getName()}_${this.generateId()}`,
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
    this.getEventEmitter().emit(ADD_ITEM, item);

    return item;
  }

  delete(item) {
    this[ITEM_SET].delete(item);
    this.getEventEmitter().emit(DELETE_ITEM, item);
    item.teardown();
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

  generateId() {
    return this[CURRENT_ID]++;
  }

  // User Interface
  setReduceMethod(_callback) {
    this.getEventEmitter().on(ADD_ITEM, _callback.bind(this));
    this.getEventEmitter().on(DELETE_ITEM, _callback.bind(this));
    this.getEventEmitter().on(ITEM_UPDATE, _callback.bind(this));
  }
}

export default StoreSet;
