/**
 * StoreMultiSet
 */

import StoreBase from './StoreBase'
import StoreSet from './StoreSet'
import { UPDATE, ADD_ITEM, DELETE_ITEM, ITEM_UPDATE, TEARDOWN } from './Events'

var MAP_FROM     = Symbol('MAP_FROM'),
    ITEM_CLASS   = Symbol('ITEM_CLASS'),
    ITEM_SOURCES = Symbol('ITEM_SOURCES'),
    MULTISET     = Symbol('MULTISET'),
    SET_CLASS    = Symbol('SET_CLASS'),
    CURRENT_ID   = Symbol('CURRENT_ID');

class StoreMultiSet extends StoreBase{
  constructor($store, setName) {
    super(setName);

    // Private variables
    this[MAP_FROM] = null;
    this[ITEM_CLASS] = null;
    this[ITEM_SOURCES] = [];
    this[MULTISET] = new Set();
    this[SET_CLASS] = StoreSet; // Default setClass
    this[CURRENT_ID] = 0;

    // Public variables
    this.$store = $store;
    this.type = 'MultiSet';
  }

  setMapFrom(setName) {
    this[MAP_FROM] = this.$store[setName];
    this[MAP_FROM].getEventEmitter()
      .on(ADD_ITEM, (sourceItem) => {
        this.add({ sourceItem: sourceItem });
      });

    return this;
  }

  setClass(setClass) {
    this[SET_CLASS] = setClass;
    return this;
  }

  itemClass(itemClass) {
    this[ITEM_CLASS] = itemClass;

    return this;
  }

  itemSource() {
    this[ITEM_SOURCES] =
      Array.prototype.slice.call(arguments)

    return this;
  }

  add(option) {
    let itemClass = this[ITEM_CLASS],
        setName = `${this.getName()}_${this.generateId()}`,
        set = this.$store.createSet(setName, this[SET_CLASS])
                .itemClass(itemClass)


    this[MULTISET].add(set);

    if (option.sourceItem) {
      set.itemSource(option.sourceItem.getName(), ...this[ITEM_SOURCES]);
    } else {
      set.itemSource(...this[ITEM_SOURCES]);

      option.sourceItem.getEventEmitter()
        .on(TEARDOWN, () => {
          this.delete(set);
        });
    }

    this.setInitialize(option.sourceItem, set);

    return set;
  }

  delete(set) {
    this[MULTISET].delete(set);
  }

  generateId() {
    return this[CURRENT_ID]++;
  }

  size() {
    return this[MULTISET].size;
  }

  toArray() {
    var array = []
    this[MULTISET].forEach((set) => {
      array.push(set);
    });
    return array;
  }

  getMapFrom() {
    return this[MAP_FROM];
  }

  // User Interface
  setInitialize(sourceItem, set) {
    //
  }
}

export default StoreMultiSet;
