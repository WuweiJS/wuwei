/**
 * StoreSet
 */

import StoreBase from './StoreBase'
import { UPDATE, ADD_ITEM, DELETE_ITEM, ITEM_UPDATE } from './Events'

var MAP_FROM     = Symbol('MAP_FROM'),
    ITEM_CLASS   = Symbol('ITEM_CLASS'),
    ITEM_SOURCES = Symbol('ITEM_SOURCES'),
    ITEM_SET     = Symbol('ITEM_SET'),
    CURRENT_ID   = Symbol('CURRENT_ID');

class StoreSet extends StoreBase {
  constructor($store, setName) {
    super(setName);

    // Private variables
    this[MAP_FROM]   = null;
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
    this[MAP_FROM] = this.$store[setName];
    this[MAP_FROM].getEventEmitter()
      .on(ADD_ITEM, (sourceItem) => {
        this.add({
          sourceItem: sourceItem
        });
      });

    return this;
  }

  getMapFrom() {
    return this[MAP_FROM];
  }

  itemSource() {
    this[ITEM_SOURCES] =
      Array.prototype.slice.call(arguments)

    return this;
  }

  notifyItemUpdate() {
    this.getEventEmitter().emit(ITEM_UPDATE);
  }

  add(option) {
    let itemClass = this[ITEM_CLASS],
        itemName  = `${this.getName()}_${this.generateId()}`,
        item      = this.$store.create(itemName, itemClass, this);

    if (option.sourceItem) {
      item.source(...[option.sourceItem.getName(), ...this[ITEM_SOURCES]]);
    } else {
      item.source(...this[ITEM_SOURCES]);
    }

    if (option.defalutValue) {
      item.setValue(option.defalutValue);
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

  filter(_test) {
    toArray().filter(_test)

  }

  sort(_test) {
    this.toArray().filter(_test)
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

  getMapFrom() {
    return this[MAP_FROM];
  }

  getItemSource() {
    return this[ITEM_SOURCES];
  }

  // User Interface
  addUpdateListener(_callback) {
    this.getEventEmitter().on(ADD_ITEM, _callback.bind(this));
    this.getEventEmitter().on(DELETE_ITEM, _callback.bind(this));
    this.getEventEmitter().on(ITEM_UPDATE, _callback.bind(this));
  }
}

export default StoreSet;
