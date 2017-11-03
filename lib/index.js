'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./messages.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Messages = function (_React$Component) {
  _inherits(Messages, _React$Component);

  function Messages(props) {
    _classCallCheck(this, Messages);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  Messages.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'message-container' },
      this.props.info && _react2.default.createElement(
        'div',
        { className: 'uikit-page-alerts', role: 'alert' },
        this.props.info
      ),
      this.props.warning && _react2.default.createElement(
        'div',
        { className: 'uikit-page-alerts uikit-page-alerts--warning', role: 'alert' },
        this.props.warning
      ),
      this.props.success && _react2.default.createElement(
        'div',
        { className: 'uikit-page-alerts uikit-page-alerts--success', role: 'alert' },
        this.props.success
      ),
      this.props.error && _react2.default.createElement(
        'div',
        { className: 'uikit-page-alerts uikit-page-alerts--error', role: 'alert' },
        this.props.error
      )
    );
  };

  return Messages;
}(_react2.default.Component);

exports.default = Messages;
module.exports = exports['default'];