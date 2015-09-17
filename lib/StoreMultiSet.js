/**
 * StoreMultiSet
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _StoreBase2 = require('./StoreBase');

var _StoreBase3 = _interopRequireDefault(_StoreBase2);

var _StoreSet = require('./StoreSet');

var _StoreSet2 = _interopRequireDefault(_StoreSet);

var _Events = require('./Events');

var MAP_FROM = Symbol('MAP_FROM'),
    ITEM_CLASS = Symbol('ITEM_CLASS'),
    ITEM_SOURCES = Symbol('ITEM_SOURCES'),
    MULTISET = Symbol('MULTISET'),
    SET_CLASS = Symbol('SET_CLASS'),
    CURRENT_ID = Symbol('CURRENT_ID');

var StoreMultiSet = (function (_StoreBase) {
  _inherits(StoreMultiSet, _StoreBase);

  function StoreMultiSet($store, setName) {
    _classCallCheck(this, StoreMultiSet);

    _get(Object.getPrototypeOf(StoreMultiSet.prototype), 'constructor', this).call(this, setName);

    // Private variables
    this[MAP_FROM] = null;
    this[ITEM_CLASS] = null;
    this[ITEM_SOURCES] = [];
    this[MULTISET] = new Set();
    this[SET_CLASS] = _StoreSet2['default']; // Default setClass
    this[CURRENT_ID] = 0;

    // Public variables
    this.$store = $store;
    this.type = 'MultiSet';
  }

  _createClass(StoreMultiSet, [{
    key: 'setMapFrom',
    value: function setMapFrom(setName) {
      var _this = this;

      this[MAP_FROM] = this.$store[setName];
      this[MAP_FROM].getEventEmitter().on(_Events.ADD_ITEM, function (sourceItem) {
        _this.add({ sourceItem: sourceItem });
      });

      return this;
    }
  }, {
    key: 'setClass',
    value: function setClass(_setClass) {
      this[SET_CLASS] = _setClass;
      return this;
    }
  }, {
    key: 'itemClass',
    value: function itemClass(_itemClass) {
      this[ITEM_CLASS] = _itemClass;

      return this;
    }
  }, {
    key: 'itemSource',
    value: function itemSource() {
      this[ITEM_SOURCES] = Array.prototype.slice.call(arguments);

      return this;
    }
  }, {
    key: 'add',
    value: function add(option) {
      var _this2 = this;

      var itemClass = this[ITEM_CLASS],
          setName = this.getName() + '_' + this.generateId(),
          set = this.$store.createSet(setName, this[SET_CLASS]).itemClass(itemClass);

      this[MULTISET].add(set);

      if (option.sourceItem) {
        set.itemSource.apply(set, [option.sourceItem.getName()].concat(_toConsumableArray(this[ITEM_SOURCES])));
      } else {
        set.itemSource.apply(set, _toConsumableArray(this[ITEM_SOURCES]));

        option.sourceItem.getEventEmitter().on(_Events.TEARDOWN, function () {
          _this2['delete'](set);
        });
      }

      this.setInitialize(option.sourceItem, set);

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
    key: 'toArray',
    value: function toArray() {
      var array = [];
      this[MULTISET].forEach(function (set) {
        array.push(set);
      });
      return array;
    }
  }, {
    key: 'getMapFrom',
    value: function getMapFrom() {
      return this[MAP_FROM];
    }

    // User Interface
  }, {
    key: 'setInitialize',
    value: function setInitialize(sourceItem, set) {
      //
    }
  }]);

  return StoreMultiSet;
})(_StoreBase3['default']);

exports['default'] = StoreMultiSet;
module.exports = exports['default'];