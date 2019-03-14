function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import observer from 'node-observer';
// import Spinner from 'react-spinner-material'
import Spinner from './../Spinner';

var LoadableSection = function (_React$Component) {
  _inherits(LoadableSection, _React$Component);

  function LoadableSection(props) {
    _classCallCheck(this, LoadableSection);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.componentWillUnmount = function () {
      observer.unsubscribe('load-listener', "section-loading");
    };

    _this.state = {
      loading: false
    };
    return _this;
  }

  LoadableSection.prototype.componentDidMount = function componentDidMount() {
    observer.subscribe('load-listener', "section-loading", function (who, data) {
      this.setState(function (prevState, props) {
        return {
          loading: data.loading
        };
      });
    }.bind(this));
  };

  LoadableSection.prototype.render = function render() {

    var loading = this.props.loading || this.state.loading;

    return React.createElement(
      'div',
      null,
      loading && React.createElement(Spinner, {
        size: 50,
        spinnerColor: "#1B7991",
        spinnerWidth: 4,
        visible: true
      }),
      !loading && React.createElement(
        'div',
        null,
        this.props.children
      )
    );
  };

  return LoadableSection;
}(React.Component);

export default LoadableSection;