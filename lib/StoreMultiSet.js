/**
 * StoreMultiSet
 */

// TODO: Wait for refactor & redesign

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _events = require('events');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var EVENT_EMITTER = Symbol('EVENT_EMITTER'),
    NAME = Symbol('NAME'),
    SET_SOURCE = Symbol('SET_SOURCE'),
    ITEM_SOURCES = Symbol('ITEM_SOURCES'),
    MULTISET = Symbol('MULTISET'),
    ITEM_CLASS = Symbol('ITEM_CLASS'),
    ON_SET_CREATE = Symbol('ON_SET_CREATE'),
    CURRENT_ID = Symbol('CURRENT_ID'),
    TEARDOWN = 'TEARDOWN',
    ADD_ITEM = 'ADD_ITEM';

var StoreMultiSet = (function () {
  function StoreMultiSet($store, setName, itemClass) {
    _classCallCheck(this, StoreMultiSet);

    // Private variables
    this[EVENT_EMITTER] = new _events.EventEmitter();
    this[NAME] = setName;

    this[SET_SOURCE] = null;
    this[ITEM_SOURCES] = [];

    this[MULTISET] = new Set();;
    this[ITEM_CLASS] = itemClass;

    this[ON_SET_CREATE] = null;

    this[CURRENT_ID] = 0;

    // Public variables
    this.$store = $store;
    this.type = 'MultiSet';
  }

  _createClass(StoreMultiSet, [{
    key: 'getEventEmitter',
    value: function getEventEmitter() {
      return this[EVENT_EMITTER];
    }
  }, {
    key: 'setBelongsTo',
    value: function setBelongsTo(setName) {
      var _this = this;

      this[SET_SOURCE] = this.$store[setName];
      this[SET_SOURCE].getEventEmitter().on(ADD_ITEM, function (sourceItem) {
        _this.add(sourceItem);
      });

      return this;
    }
  }, {
    key: 'onSetCreate',
    value: function onSetCreate(_callback) {
      this[ON_SET_CREATE] = _callback;
    }
  }, {
    key: 'itemSource',
    value: function itemSource() {
      this[ITEM_SOURCES] = Array.prototype.slice.call(arguments);

      return this;
    }
  }, {
    key: 'add',
    value: function add(sourceItem) {
      var _$store$createSet,
          _this2 = this;

      var itemClass = this[ITEM_CLASS],
          setName = this[NAME] + '_' + this.generateId(),
          set = (_$store$createSet = this.$store.createSet(setName, itemClass)).itemSource.apply(_$store$createSet, [sourceItem.getName()].concat(_toConsumableArray(this[ITEM_SOURCES])));

      this[MULTISET].add(set);

      sourceItem.getEventEmitter().on(TEARDOWN, function () {
        _this2['delete'](set);
      });

      if (this[ON_SET_CREATE]) {
        this[ON_SET_CREATE](set);
      }

      return set;
    }
  }, {
    key: 'delete',
    value: function _delete(set) {
      this[MULTISET]['delete'](set);
    }
  }, {
    key: 'generateId',
    value: function generateId() {
      return this[CURRENT_ID]++;
    }
  }, {
    key: 'size',
    value: function size() {
      return this[MULTISET].size;
    }
  }, {
    key: 'eachSize',
    value: function eachSize() {
      var setSizes = [];
      this[MULTISET].forEach(function (set) {
        setSizes.push(set.size());
      });
      return setSizes;
    }
  }]);

  return StoreMultiSet;
})();

exports['default'] = StoreMultiSet;
module.exports = exports['default'];