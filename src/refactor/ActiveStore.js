/**
 * ActiveStore
 */

import { EventEmitter }    from 'events'
import   Immutable         from 'immutable';

var EVENT_EMITTER = Symbol('EVENT_EMITTER'),
    SOURCES       = Symbol('SOURCES'),
    VALUE         = Symbol('VALUE'),
    NAME          = Symbol('NAME'),
    SET           = Symbol('SET'),

    TEARDOWN      = 'TEARDOWN',
    UPDATE        = 'UPDATE';

class ActiveStore {
  constructor($store, name, set = null) {

    // Private variables
    this[EVENT_EMITTER] = new EventEmitter();
    this[VALUE]         = Immutable.Map({});
    this[NAME]          = name;
    this[SET]           = set;

    // Public variables
    this.$store         = $store;
    this.type           = 'ActiveStore';

  }

  getEventEmitter() {
    return this[EVENT_EMITTER];
  }

  getName() {
    return this[NAME];
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

  sourceUpdate() {
    if (this.onSourceUpdate) {
      this.onSourceUpdate(...this[SOURCES].map(source => source.getValue()))
    }
  }

  source() {
    this[SOURCES] =
      Array.prototype.slice.call(arguments)
        .map((name) => {
          return this.$store[name];
        }); // ES6: Array.from(arguments);

    this[SOURCES].forEach((source) => {
      source.getEventEmitter()
        .on(UPDATE, () => {
          this.sourceUpdate()
        });

      source.getEventEmitter()
        .on(TEARDOWN, () => {
          console.log('teardown');
          if (this[SET]) {
            this[SET].delete(this);
          } else {
            this.teardown();
          }
        });
    });
  }

  teardown() {
    this[EVENT_EMITTER].emit(TEARDOWN);
    // this[EVENT_EMITTER].removeAllListeners();
    this.$store[this[NAME]] = null;
  }

  // Interface
  onSourceUpdate( /* Source store */ ) {
    // this.setValue({}) use setValue to change this store value.
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
                  state = {};
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

export default ActiveStore;
