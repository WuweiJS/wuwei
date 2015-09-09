/**
 * StoreBase
 */

import { EventEmitter } from 'events'
import Immutable from 'immutable'

import { UPDATE } from './Events'

var EVENT_EMITTER = Symbol('EVENT_EMITTER'),
    VALUE = Symbol('VALUE'),
    NAME  = Symbol('NAME');

class StoreBase {
  constructor(name) {
    this[VALUE] = Immutable.Map({});
    this[NAME]  = name;
    this[EVENT_EMITTER] = new EventEmitter();
  }

  setValue(object) {
    var existStore  = this[VALUE],
        newStore    = Immutable.Map(object),
        mergedStore = existStore.merge(newStore);

    if (existStore !== mergedStore) {
      this[VALUE] = mergedStore;

      // Trigger UPDATE event to children stores and notify subscribed view.
      this.getEventEmitter().emit(UPDATE, this.getValue());
    }
    return this;
  }

  getEventEmitter() {
    return this[EVENT_EMITTER];
  }

  getName() {
    return this[NAME];
  }

  getValue() {
    return this[VALUE].toObject();
  }

  subscribe(_callback) {
    if (_callback) {

      this.getEventEmitter().on(UPDATE, _callback);
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
                  this.getEventEmitter().removeListener(UPDATE, subscribeCallback);
                }
              }

              this.getEventEmitter().on(UPDATE, subscribeCallback);

              return this.getValue();
            }
          }
        }
      }
    }
  }
}

export default StoreBase;
