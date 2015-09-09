/**
 * ActiveStore
 */
import StoreBase from './StoreBase'
import { UPDATE, TEARDOWN } from './Events'

var REG_LISTENERS = Symbol('REG_LISTENERS'),
    SOURCES = Symbol('SOURCES'),
    SET = Symbol('SET');

class ActiveStore extends StoreBase {
  constructor($store, name, set = null) {
    super(name);

    // Private variables
    this[REG_LISTENERS] = {};
    this[SOURCES] = [];
    this[SET] = set;

    // Public variables
    this.$store = $store;
    this.type = 'ActiveStore';
  }

  sourceUpdate() {
    if (this.onSourceUpdate) {
      this.onSourceUpdate(...this[SOURCES].map(source => source.getValue()))
    }
  }

  sourceTeardown() {
    if (this[SET]) {
      this[SET].delete(this);
    } else {
      this.teardown();
    }
  }

  source() {
    this[SOURCES] =
      Array.prototype.slice.call(arguments)
        .map((name) => { return this.$store[name]; }); // ES6: Array.from(arguments);

    this[REG_LISTENERS][UPDATE] = this.sourceUpdate.bind(this);
    this[REG_LISTENERS][TEARDOWN] = this.sourceTeardown.bind(this);

    this[SOURCES].forEach((source) => {
      source.getEventEmitter()
        .on(UPDATE, this[REG_LISTENERS][UPDATE]);
      source.getEventEmitter()
        .on(TEARDOWN, this[REG_LISTENERS][TEARDOWN]);
    });
  }

  teardown() {
    this.getEventEmitter().emit(TEARDOWN);

    this[SOURCES].forEach((source) => {
      source.getEventEmitter()
        .removeListener(UPDATE, this[REG_LISTENERS][UPDATE]);
      source.getEventEmitter()
        .removeListener(TEARDOWN, this[REG_LISTENERS][TEARDOWN]);
    });

    this.$store[this.getName()] = null;
  }

  // User Interface
  onSourceUpdate( /* Source stores */ ) {
    // this.setValue({}) use setValue to change this store value.
  }
}

export default ActiveStore;
