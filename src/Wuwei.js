import { Graph, alg } from 'graphlib'
import ActiveStore from './ActiveStore'
import Action from './Action'

var G = new Graph({ directed: true });
var storeGraphTable = {};

var setStoreNode = function(storeName, storeClass, parentStoreNames) {
  if (G.hasNode(storeName)) { throw `Store node: ${storeName} is exist.` }
  G.setNode(storeName);

  parentStoreNames.forEach((parentStoreName) => {
    if (!G.hasNode(parentStoreName)) { throw `Parent node: ${parentStoreName} is not exist.` }
    G.setEdge(parentStoreName, storeName);
  });

  storeGraphTable[storeName] =
    new storeClass(...parentStoreNames.map((parentStoreName) => {
      return storeGraphTable[parentStoreName]
    }));
};

var getStoreNode = function(storeName) {
  return storeGraphTable[storeName];
};

var initAllStoreNode = function() {
  for (let name in storeGraphTable) {
    storeGraphTable[name].setDefaultValue();
  }
};

//

var actionTable = {};

var setAction = function(actionName, actionClass) {
  actionTable[actionName] = actionClass;
}

var getAction = function(actionName) {
  return new actionTable[actionName]();
}

//

var initializeWuwei = function(fn) {
  fn();

  initAllStoreNode();

/**
 * In current state, cycle will be not exist in the Store Graph
 * if (alg.findCycles(G).length > 0) { throw 'Found cycle in Store Graph' }
 */

};

//

export default {
  Graph: {
    setStore: setStoreNode,
    getStore: getStoreNode
  },
  Gun: {
    setAction: setAction,
    getAction: getAction
  },
  Action: Action,
  ActiveStore: ActiveStore,
  init: initializeWuwei
};
