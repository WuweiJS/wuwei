/**
 * StoreBase
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _events = require('events');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _Events = require('./Events');

var EVENT_EMITTER = Symbol('EVENT_EMITTER'),
    VALUE = Symbol('VALUE'),
    NAME = Symbol('NAME');

var StoreBase = (function () {
  function StoreBase(name) {
    _classCallCheck(this, StoreBase);

    this[VALUE] = _immutable2['default'].Map({});
    this[NAME] = name;
    this[EVENT_EMITTER] = new _events.EventEmitter();
  }

  _createClass(StoreBase, [{
    key: 'setValue',
    value: function setValue(object) {
      var existStore = this[VALUE],
          newStore = _immutable2['default'].Map(object),
          mergedStore = existStore.merge(newStore);

      if (existStore !== mergedStore) {
        this[VALUE] = mergedStore;

        // Trigger UPDATE event to children stores and notify subscribed view.
        this.getEventEmitter().emit(_Events.UPDATE, this.getValue());
      }
      return this;
    }
  }, {
    key: 'getEventEmitter',
    value: function getEventEmitter() {
      return this[EVENT_EMITTER];
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this[NAME];
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this[VALUE].toObject();
    }
  }, {
    key: 'subscribe',
    value: function subscribe(_callback) {
      var _this = this;

      if (_callback) {

        this.getEventEmitter().on(_Events.UPDATE, _callback);
        return this.getValue();
      } else {
        return {
          bind: function bind(reactComponent) {
            return {
              state: function state(stateKey) {
                var subscribeCallback = function subscribeCallback(value) {
                  if (reactComponent) {
                    var state = {};
                    state[stateKey] = value;
                    reactComponent.setState(state);
                  } else {
                    _this.getEventEmitter().removeListener(_Events.UPDATE, subscribeCallback);
                  }
                };

                _this.getEventEmitter().on(_Events.UPDATE, subscribeCallback);

                return _this.getValue();
              }
            };
          }
        };
      }
    }
  }]);

  return StoreBase;
})();

exports['default'] = StoreBase;
module.exports = exports['default'];