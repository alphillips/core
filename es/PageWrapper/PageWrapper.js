var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import { setCacheData, getCacheData, addCacheData } from './../cache-service';

function wrapPage() {

  return function (WrappedComponent) {
    var _class, _temp, _initialiseProps;

    var PageWrapper = (_temp = _class = function (_React$Component) {
      _inherits(PageWrapper, _React$Component);

      function PageWrapper(props) {
        _classCallCheck(this, PageWrapper);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _initialiseProps.call(_this);

        var data = getCacheData('rex-data');
        _this.rexData = {};
        if (data !== undefined && data !== null) {
          _this.rexData = data;
        }

        _this.success = null;
        _this.error = null;
        var userMessage = getCacheData('user-message');
        if (userMessage !== undefined && userMessage !== null) {
          setCacheData('user-message', null);
          if (userMessage.success) {
            _this.success = userMessage.success;
          }
          if (userMessage.error) {
            _this.error = userMessage.error;
          }
        }

        window.scrollTo(0, 0);
        return _this;
      }

      PageWrapper.prototype.render = function render() {
        return React.createElement(WrappedComponent, _extends({}, this.props, {
          saveCache: this.save,
          cache: this.rexData,
          getCache: this.getCache,
          setMessage: this.setMessage,
          success: this.success,
          error: this.error
        }));
      };

      return PageWrapper;
    }(React.Component), _initialiseProps = function _initialiseProps() {
      this.save = function (data) {
        addCacheData('rex-data', data);
      };

      this.getCache = function (key) {
        return getCacheData(key);
      };

      this.setMessage = function (msg) {
        setCacheData('user-message', msg);
      };
    }, _temp);


    return PageWrapper;
  };
}

export default wrapPage;