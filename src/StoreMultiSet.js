/**
 * StoreMultiSet
 */

import { EventEmitter }    from 'events'
import   Immutable         from 'immutable'

var EVENT_EMITTER  = Symbol('EVENT_EMITTER'),
    NAME           = Symbol('NAME'),

    SET_SOURCE     = Symbol('SET_SOURCE'),
    ITEM_SOURCES   = Symbol('ITEM_SOURCES'),

    MULTISET       = Symbol('MULTISET'),
    ITEM_CLASS     = Symbol('ITEM_CLASS'),

    ON_SET_CREATE  = Symbol('ON_SET_CREATE'),

    CURRENT_ID     = Symbol('CURRENT_ID'),

    TEARDOWN       = 'TEARDOWN',
    ADD_ITEM       = 'ADD_ITEM';

class StoreMultiSet {
  constructor($store, setName, itemClass) {

    // Private variables
    this[EVENT_EMITTER]  = new EventEmitter();
    this[NAME]           = setName;

    this[SET_SOURCE]     = null;
    this[ITEM_SOURCES]   = [];

    this[MULTISET]       = new Set();;
    this[ITEM_CLASS]     = itemClass;

    this[ON_SET_CREATE]  = null;

    this[CURRENT_ID]     = 0;

    // Public variables
    this.$store          = $store;
    this.type            = 'MultiSet';

  }

  getEventEmitter() {
    return this[EVENT_EMITTER];
  }

  setBelongsTo(setName) {
    this[SET_SOURCE] = this.$store[setName];
    this[SET_SOURCE].getEventEmitter()
      .on(ADD_ITEM, (sourceItem) => {
        this.add(sourceItem);
      });

    return this;
  }

  onSetCreate(_callback) {
    this[ON_SET_CREATE] = _callback;
  }

  itemSource() {
    this[ITEM_SOURCES] =
      Array.prototype.slice.call(arguments)

    return this;
  }

  add(sourceItem) {
    let itemClass = this[ITEM_CLASS],
        setName   = `${this[NAME]}_${this.generateId()}`,
        set       = this.$store
                      .createSet(setName, itemClass)
                      .itemSource(sourceItem.getName(), ...this[ITEM_SOURCES]);

    this[MULTISET].add(set);

    sourceItem.getEventEmitter()
      .on(TEARDOWN, () => {
        this.delete(set);
      });

    if (this[ON_SET_CREATE]) {
      this[ON_SET_CREATE](set);
    }

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

  eachSize() {
    var setSizes = []
    this[MULTISET].forEach((set) => {
      setSizes.push(set.size());
    });
    return setSizes;
  }
}

export default StoreMultiSet;
