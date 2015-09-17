/**
 * StoreResource
 */

import ActiveStore   from './ActiveStore'
import StoreSet      from './StoreSet'
import StoreMultiSet from './StoreMultiSet'

require('events').EventEmitter.prototype._maxListeners = 65536;

var s_r_space = {},
    a_r_space = {};

class StoreResource {
  constructor() {
    //
  }

  create(storeName, storeClass, set = null) {
    if (this[storeName]) { throw `Store node: ${storeName} is exist.` }
    this[storeName] = new storeClass(this, storeName, set);

    return this[storeName];
  }

  subscribe(stateStorePairs) {
    return {
      bind: (reactComponent) => {
        let resultPairs = {};

        for (let stateKey in stateStorePairs) {
          let storeName = stateStorePairs[stateKey];
          resultPairs[stateKey] =
            this[storeName].subscribe().bind(reactComponent).state(stateKey);
        }

        return resultPairs;
      }
    }
  }

  createSet(setName, setClass) {
    if (this[setName]) { throw `Store node: ${setName} is exist.` }
    this[setName] = new setClass(this, setName);

    return this[setName];
  }

  createMultiSet(multiSetName, multiSetClass) {
    if (this[multiSetName]) { throw `Store node: ${multiSetName} is exist.` }
    this[multiSetName] = new multiSetClass(this, multiSetName);

    return this[multiSetName];
  }
}

class ActionResource {
  constructor($store) {
    this[$store] = $store;
  }

  dynamic(_callback) {
    _callback();
  }
}

function Wuwei(namespace) {
  s_r_space[namespace] =
    (s_r_space[namespace]) ?
      (s_r_space[namespace]) : new StoreResource();

  a_r_space[namespace] =
    (a_r_space[namespace]) ?
      (a_r_space[namespace]) : new ActionResource(s_r_space[namespace]);

  return {
    $store:  s_r_space[namespace],
    $action: a_r_space[namespace],

    ActiveStore:   ActiveStore,
    StoreSet:      StoreSet,
    StoreMultiSet: StoreMultiSet
  }
}

export default Wuwei;
