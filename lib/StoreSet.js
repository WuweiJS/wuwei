/**
 * StoreSet
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _StoreBase2 = require('./StoreBase');

var _StoreBase3 = _interopRequireDefault(_StoreBase2);

var _Events = require('./Events');

var SET_SOURCE = Symbol('SET_SOURCE'),
    ITEM_CLASS = Symbol('ITEM_CLASS'),
    ITEM_SOURCES = Symbol('ITEM_SOURCES'),
    ITEM_SET = Symbol('ITEM_SET'),
    CURRENT_ID = Symbol('CURRENT_ID');

var StoreSet = (function (_StoreBase) {
  _inherits(StoreSet, _StoreBase);

  function StoreSet($store, setName) {
    _classCallCheck(this, StoreSet);

    _get(Object.getPrototypeOf(StoreSet.prototype), 'constructor', this).call(this, setName);

    // Private variables
    this[SET_SOURCE] = null;
    this[ITEM_CLASS] = null;
    this[ITEM_SOURCES] = [];
    this[ITEM_SET] = new Set();;
    this[CURRENT_ID] = 0;

    // Public variables
    this.$store = $store;
    this.type = 'StoreSet';
  }

  _createClass(StoreSet, [{
    key: 'itemClass',
    value: function itemClass(_itemClass) {
      this[ITEM_CLASS] = _itemClass;

      return this;
    }
  }, {
    key: 'itemMapFrom',
    value: function itemMapFrom(setName) {
      var _this = this;

      this[SET_SOURCE] = this.$store[setName];
      this[SET_SOURCE].getEventEmitter().on(_Events.ADD_ITEM, function (sourceItem) {
        _this.add(sourceItem);
      });

      return this;
    }
  }, {
    key: 'itemSource',
    value: function itemSource() {
      this[ITEM_SOURCES] = Array.prototype.slice.call(arguments);

      return this;
    }
  }, {
    key: 'notifyItemUpdate',
    value: function notifyItemUpdate() {
      this.getEventEmitter().emit(_Events.ITEM_UPDATE);
    }
  }, {
    key: 'add',
    value: function add() {
      var _this2 = this;

      var sourceItem = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      var itemClass = this[ITEM_CLASS],
          itemName = this.getName() + '_' + this.generateId(),
          item = this.$store.create(itemName, itemClass, this);

      if (sourceItem) {
        item.source.apply(item, [sourceItem.getName()].concat(_toConsumableArray(this[ITEM_SOURCES])));
      } else {
        item.source.apply(item, _toConsumableArray(this[ITEM_SOURCES]));
      }

      item.subscribe(function () {
        _this2.notifyItemUpdate();
      });

      this[ITEM_SET].add(item);
      this.getEventEmitter().emit(_Events.ADD_ITEM, item);

      return item;
    }
  }, {
    key: 'delete',
    value: function _delete(item) {
      this[ITEM_SET]['delete'](item);
      this.getEventEmitter().emit(_Events.DELETE_ITEM, item);
      item.teardown();
    }
  }, {
    key: 'size',
    value: function size() {
      return this[ITEM_SET].size;
    }
  }, {
    key: 'toArray',
    value: function toArray() {
      var array = [];
      this[ITEM_SET].forEach(function (item) {
        array.push(item);
      });
      return array;
    }
  }, {
    key: 'at',
    value: function at(index) {
      return this.toArray()[index];
    }
  }, {
    key: 'deleteAt',
    value: function deleteAt(index) {
      this['delete'](this.toArray()[index]);
    }
  }, {
    key: 'generateId',
    value: function generateId() {
      return this[CURRENT_ID]++;
    }

    // User Interface
  }, {
    key: 'setReduceMethod',
    value: function setReduceMethod(_callback) {
      this.getEventEmitter().on(_Events.ADD_ITEM, _callback.bind(this));
      this.getEventEmitter().on(_Events.DELETE_ITEM, _callback.bind(this));
      this.getEventEmitter().on(_Events.ITEM_UPDATE, _callback.bind(this));
    }
  }]);

  return StoreSet;
})(_StoreBase3['default']);

exports['default'] = StoreSet;
module.exports = exports['default'];