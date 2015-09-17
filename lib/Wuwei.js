/**
 * StoreResource
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ActiveStore = require('./ActiveStore');

var _ActiveStore2 = _interopRequireDefault(_ActiveStore);

var _StoreSet = require('./StoreSet');

var _StoreSet2 = _interopRequireDefault(_StoreSet);

var _StoreMultiSet = require('./StoreMultiSet');

var _StoreMultiSet2 = _interopRequireDefault(_StoreMultiSet);

require('events').EventEmitter.prototype._maxListeners = 65536;

var s_r_space = {},
    a_r_space = {};

var StoreResource = (function () {
  function StoreResource() {
    _classCallCheck(this, StoreResource);
  }

  _createClass(StoreResource, [{
    key: 'create',

    //
    value: function create(storeName, storeClass) {
      var set = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      if (this[storeName]) {
        throw 'Store node: ' + storeName + ' is exist.';
      }
      this[storeName] = new storeClass(this, storeName, set);

      return this[storeName];
    }
  }, {
    key: 'subscribe',
    value: function subscribe(stateStorePairs) {
      var _this = this;

      return {
        bind: function bind(reactComponent) {
          var resultPairs = {};

          for (var stateKey in stateStorePairs) {
            var storeName = stateStorePairs[stateKey];
            resultPairs[stateKey] = _this[storeName].subscribe().bind(reactComponent).state(stateKey);
          }

          return resultPairs;
        }
      };
    }
  }, {
    key: 'createSet',
    value: function createSet(setName, setClass) {
      if (this[setName]) {
        throw 'Store node: ' + setName + ' is exist.';
      }
      this[setName] = new setClass(this, setName);

      return this[setName];
    }
  }, {
    key: 'createMultiSet',
    value: function createMultiSet(multiSetName, multiSetClass) {
      if (this[multiSetName]) {
        throw 'Store node: ' + multiSetName + ' is exist.';
      }
      this[multiSetName] = new multiSetClass(this, multiSetName);

      return this[multiSetName];
    }
  }]);

  return StoreResource;
})();

var ActionResource = (function () {
  function ActionResource($store) {
    _classCallCheck(this, ActionResource);

    this[$store] = $store;
  }

  _createClass(ActionResource, [{
    key: 'dynamic',
    value: function dynamic(_callback) {
      _callback();
    }
  }]);

  return ActionResource;
})();

function Wuwei(namespace) {
  s_r_space[namespace] = s_r_space[namespace] ? s_r_space[namespace] : new StoreResource();

  a_r_space[namespace] = a_r_space[namespace] ? a_r_space[namespace] : new ActionResource(s_r_space[namespace]);

  return {
    $store: s_r_space[namespace],
    $action: a_r_space[namespace],

    ActiveStore: _ActiveStore2['default'],
    StoreSet: _StoreSet2['default'],
    StoreMultiSet: _StoreMultiSet2['default']
  };
}

exports['default'] = Wuwei;
module.exports = exports['default'];