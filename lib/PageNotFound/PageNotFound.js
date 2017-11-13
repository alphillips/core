'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blades = require('./blades.svg');

var _blades2 = _interopRequireDefault(_blades);

var _tower = require('./tower.svg');

var _tower2 = _interopRequireDefault(_tower);

require('./page-not-found.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    return _react2.default.createElement(
      'div',
      { className: 'page-not-found' },
      _react2.default.createElement(
        'h1',
        null,
        'Page not found'
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'div',
        { className: 'windmill' },
        _react2.default.createElement(
          'div',
          { className: 'tower' },
          _react2.default.createElement('img', { src: _tower2.default })
        ),
        _react2.default.createElement(
          'div',
          { className: 'blades' },
          _react2.default.createElement('img', { src: _blades2.default })
        )
      )
    );
  };

  return PageNotFound;
}(_react2.default.Component);

exports.default = PageNotFound;
module.exports = exports['default'];