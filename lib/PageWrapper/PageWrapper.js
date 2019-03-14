'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cacheService = require('./../cache-service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function wrapPage() {

  return function (WrappedComponent) {
    var _class, _temp, _initialiseProps;

    var PageWrapper = (_temp = _class = function (_React$Component) {
      _inherits(PageWrapper, _React$Component);

      function PageWrapper(props) {
        _classCallCheck(this, PageWrapper);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _initialiseProps.call(_this);

        var data = (0, _cacheService.getCacheData)('rex-data');
        _this.rexData = {};
        if (data !== undefined && data !== null) {
          _this.rexData = data;
        }

        _this.success = null;
        _this.error = null;
        _this.info = null;
        _this.warning = null;

        var userMessage = (0, _cacheService.getCacheData)('user-message');
        if (userMessage !== undefined && userMessage !== null) {
          (0, _cacheService.setCacheData)('user-message', null);
          if (userMessage.success) {
            _this.success = userMessage.success;
          }
          if (userMessage.error) {
            _this.error = userMessage.error;
          }
          if (userMessage.info) {
            _this.info = userMessage.info;
          }
          if (userMessage.warning) {
            _this.warning = userMessage.warning;
          }
        }

        window.scrollTo(0, 0);
        return _this;
      }

      PageWrapper.prototype.render = function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          saveCache: this.save,
          cache: this.rexData,
          getCache: this.getCache,
          setMessage: this.setMessage,
          success: this.success,
          error: this.error,
          info: this.info,
          warning: this.warning
        }));
      };

      return PageWrapper;
    }(_react2.default.Component), _initialiseProps = function _initialiseProps() {
      this.save = function (data) {
        (0, _cacheService.addCacheData)('rex-data', data);
      };

      this.getCache = function (key) {
        return (0, _cacheService.getCacheData)(key);
      };

      this.setMessage = function (msg) {
        (0, _cacheService.setCacheData)('user-message', msg);
      };
    }, _temp);


    return PageWrapper;
  };
}

exports.default = wrapPage;
module.exports = exports['default'];