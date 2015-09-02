/**
 * ActiveStore Flow
 * ----------------
 * Initialize:     constructor() -> setDefaultValue();
 * Parents update: resolve() -> onParentsUpdate() -> setStore() >>> ? [emit('UPDATE'), notifyView()];
 * Action fire:    setStore() >>> ? [emit('UPDATE'), notifyView()];
 * ----------------
 */

import { EventEmitter } from 'events'
import Immutable from 'immutable';
import { Graph } from './Wuwei'

var PARENT_STORES   = Symbol('PARENT_STORES'),
    IMMUTABLE_STORE = Symbol('IMMUTABLE_STORE'),
    EVENT_EMITTER   = Symbol('EVENT_EMITTER');

class ActiveStore {

  // default store()

  constructor() {
    // Private variables
    this[PARENT_STORES]   = Array.prototype.slice.call(arguments); //Array.from(arguments);
    this[IMMUTABLE_STORE] = Immutable.Map({});
    this[EVENT_EMITTER]   = new EventEmitter();

    // Public variables
    this.store = null // Default store

    // Binding parent stores.
    this[PARENT_STORES].forEach((parentStore) => {
      parentStore.getEventEmitter().on('UPDATE', () => {
        this.resolve();
      });
    });

    // this.store = set default store value.
  }

  getEventEmitter() {
    return this[EVENT_EMITTER];
  }

  resolve() {
    if (this.onParentsUpdate != null) {
      this.onParentsUpdate(...this[PARENT_STORES].map(parentStore => parentStore.getValue()))
    }
  }

  // Store value

  setDefaultValue() {
    if (this.value) {
      this[IMMUTABLE_STORE] = Immutable.Map(this.value);
      this[EVENT_EMITTER].emit('UPDATE', this.getValue());
    }
  }

  setValue(object) {

    var existStore  = this[IMMUTABLE_STORE],
        newStore    = Immutable.Map(object),
        mergedStore = existStore.merge(newStore);

    if (existStore !== mergedStore) {
      this[IMMUTABLE_STORE] = mergedStore;

      // Trigger UPDATE event for children & Notify subscribed view.
      this[EVENT_EMITTER].emit('UPDATE', this.getValue());
    }
  }

  getValue() {
    return this[IMMUTABLE_STORE].toObject();
  }

  // View

  subscribe(fn) {
    this[EVENT_EMITTER].on('UPDATE', fn);
    return this.getValue();
  }

  // Interface
  onParentsUpdate( /* Parent store */ ) {
    // this.setStore({}) use setStore to change this store value.
  }
}

export default ActiveStore;
