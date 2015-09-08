import { EventEmitter }    from 'events'
import   Immutable         from 'immutable'

var EVENT_EMITTER  = Symbol('EVENT_EMITTER'),
    NAME           = Symbol('NAME'),

    SET_SOURCE     = Symbol('SET_SOURCE'),
    ITEM_SOURCES   = Symbol('ITEM_SOURCES'),

    ITEM_SET       = Symbol('ITEM_SET'),
    ITEM_CLASS     = Symbol('ITEM_CLASS'),

    ON_CREATE      = Symbol('ON_CREATE'),

    CURRENT_ID     = Symbol('CURRENT_ID'),

    ADD_ITEM       = 'ADD_ITEM';

class StoreSet {
  constructor($store, setName, itemClass) {

    // Private variables
    this[EVENT_EMITTER]  = new EventEmitter();
    this[NAME]           = setName;

    this[SET_SOURCE]     = null;
    this[ITEM_SOURCES]   = [];

    this[ITEM_SET]       = new Set();;
    this[ITEM_CLASS]     = itemClass;

    this[CURRENT_ID]     = 0;

    // Public variables
    this.$store          = $store;
    this.type            = 'StoreSet';

  }

  getEventEmitter() {
    return this[EVENT_EMITTER];
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

  add(sourceItem = null) {
    let itemClass = this[ITEM_CLASS],
        itemName  = `${this[NAME]}_${this.generateId()}`,
        item      = this.$store.create(itemName, itemClass, this);

    if (sourceItem) {
      item.source(...[sourceItem.getName(), ...this[ITEM_SOURCES]]);
    } else {
      item.source(...this[ITEM_SOURCES]);
    }

    this[ITEM_SET].add(item);
    this[EVENT_EMITTER].emit(ADD_ITEM, item)

    return item;
  }

  delete(item) {
    this[ITEM_SET].delete(item);
    item.teardown();
  }

  generateId() {
    return this[CURRENT_ID]++;
  }

  size() {
    return this[ITEM_SET].size;
  }
}

export default StoreSet;
