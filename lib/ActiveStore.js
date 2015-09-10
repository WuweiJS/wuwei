/**
 * ActiveStore
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

var REG_LISTENERS = Symbol('REG_LISTENERS'),
    SOURCES = Symbol('SOURCES'),
    SET = Symbol('SET');

var ActiveStore = (function (_StoreBase) {
  _inherits(ActiveStore, _StoreBase);

  function ActiveStore($store, name) {
    var set = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    _classCallCheck(this, ActiveStore);

    _get(Object.getPrototypeOf(ActiveStore.prototype), 'constructor', this).call(this, name);

    // Private variables
    this[REG_LISTENERS] = {};
    this[SOURCES] = [];
    this[SET] = set;

    // Public variables
    this.$store = $store;
    this.type = 'ActiveStore';
  }

  _createClass(ActiveStore, [{
    key: 'sourceUpdate',
    value: function sourceUpdate() {
      if (this.onSourceUpdate) {
        this.onSourceUpdate.apply(this, _toConsumableArray(this[SOURCES].map(function (source) {
          return source.getValue();
        })));
      }
    }
  }, {
    key: 'sourceTeardown',
    value: function sourceTeardown() {
      if (this[SET]) {
        this[SET]['delete'](this);
      } else {
        this.teardown();
      }
    }
  }, {
    key: 'source',
    value: function source() {
      var _this = this;

      this[SOURCES] = Array.prototype.slice.call(arguments).map(function (name) {
        return _this.$store[name];
      }); // ES6: Array.from(arguments);

      this[REG_LISTENERS][_Events.UPDATE] = this.sourceUpdate.bind(this);
      this[REG_LISTENERS][_Events.TEARDOWN] = this.sourceTeardown.bind(this);

      this[SOURCES].forEach(function (source) {
        source.getEventEmitter().on(_Events.UPDATE, _this[REG_LISTENERS][_Events.UPDATE]);
        source.getEventEmitter().on(_Events.TEARDOWN, _this[REG_LISTENERS][_Events.TEARDOWN]);
      });
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      var _this2 = this;

      this.getEventEmitter().emit(_Events.TEARDOWN);

      this[SOURCES].forEach(function (source) {
        source.getEventEmitter().removeListener(_Events.UPDATE, _this2[REG_LISTENERS][_Events.UPDATE]);
        source.getEventEmitter().removeListener(_Events.TEARDOWN, _this2[REG_LISTENERS][_Events.TEARDOWN]);
      });

      this.$store[this.getName()] = null;
    }

    // User Interface
  }, {
    key: 'onSourceUpdate',
    value: function onSourceUpdate() /* Source stores */{
      // this.setValue({}) use setValue to change this store value.
    }
  }]);

  return ActiveStore;
})(_StoreBase3['default']);

exports['default'] = ActiveStore;
module.exports = exports['default'];