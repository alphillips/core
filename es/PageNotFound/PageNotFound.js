function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import blades from './blades.svg';
import tower from './tower.svg';
import './page-not-found.css';

var PageNotFound = function (_React$Component) {
  _inherits(PageNotFound, _React$Component);

  function PageNotFound(props) {
    _classCallCheck(this, PageNotFound);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.componentWillUnmount = function () {
      // observer.unsubscribe('error-listener', "error")
    };

    _this.state = {
      info: null,
      warning: null,
      success: null,
      error: null
      // this.apiHook = (props.apiHook === false) ? false : true
    };return _this;
  }

  PageNotFound.prototype.componentDidMount = function componentDidMount() {
    // this.setState((prevState, props) => ({
    //   info:this.props.info,
    //   warning:this.props.warning,
    //   success:this.props.success,
    //   error:this.props.error
    // }))
    //
    // if(this.apiHook){
    //   observer.subscribe('error-listener', "error", function(who, data) {
    //     this.setState((prevState, props) => ({
    //       error:data
    //     }))
    //   }.bind(this))
    // }
  };

  PageNotFound.prototype.render = function render() {

    // based on https://codepen.io/pBun/pen/mkHvG

    return React.createElement(
      'div',
      { className: 'page-not-found' },
      React.createElement(
        'h1',
        null,
        'Page not found'
      ),
      React.createElement('br', null),
      React.createElement('br', null),
      React.createElement(
        'div',
        { className: 'windmill' },
        React.createElement(
          'div',
          { className: 'tower' },
          React.createElement('img', { src: tower })
        ),
        React.createElement(
          'div',
          { className: 'blades' },
          React.createElement('img', { src: blades })
        )
      )
    );
  };

  return PageNotFound;
}(React.Component);

export default PageNotFound;