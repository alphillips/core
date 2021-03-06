'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;
// import PropTypes from 'prop-types';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FPS = 1 / 25;
var RADIUS_PERCENT = 0.8;

(0, _utils.inject)(); // inject style into html

var Spinner = (_temp = _class = function (_Component) {
  _inherits(Spinner, _Component);

  function Spinner(props) {
    _classCallCheck(this, Spinner);

    // legacy support for width, height
    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var _this$props = _this.props,
        size = _this$props.size,
        width = _this$props.width,
        height = _this$props.height;


    _this.start = 0;
    _this.end = Math.PI;
    _this.flip = 1;
    _this.size = size ? size : Math.min(width, height);

    _this.state = {
      animate: false,
      running: false
    };

    _this.update = _this.update.bind(_this);
    return _this;
  }

  Spinner.prototype.componentWillMount = function componentWillMount() {
    this.setState({ animate: true });
    window.requestAnimationFrame(this.update);
  };

  Spinner.prototype.componentWillUnmount = function componentWillUnmount() {
    this.setState({ animate: false });
  };

  Spinner.prototype.update = function update() {
    var animate = this.state.animate;
    var _props = this.props,
        spinnerColor = _props.spinnerColor,
        spinnerWidth = _props.spinnerWidth;

    var c = _reactDom2.default.findDOMNode(this.refs.spinner);
    if (!c || !animate) return;

    if (this.start >= Math.PI || this.start < 0) {
      this.flip *= -1;
    }

    var step = FPS * this.flip;
    this.start = (0, _utils.clamp)(-Math.PI, Math.PI, this.start + step);
    this.end = (0, _utils.clamp)(Math.PI, 2 * Math.PI, this.end - step);

    var ctx = c.getContext('2d');
    ctx.clearRect(0, 0, this.size, this.size);
    ctx.beginPath();
    ctx.arc(this.size / 2, this.size / 2, this.size / 2 * RADIUS_PERCENT, this.start, this.end);
    ctx.strokeStyle = spinnerColor;
    ctx.lineWidth = spinnerWidth;
    ctx.stroke();

    window.requestAnimationFrame(this.update);
  };

  Spinner.prototype.render = function render() {
    // legacy support for show
    var _props2 = this.props,
        visible = _props2.visible,
        show = _props2.show;


    return _react2.default.createElement(
      'canvas',
      {
        ref: 'spinner',
        className: 'spinner',
        style: { display: visible || show ? 'block' : 'none', marginLeft: 'auto', marginRight: 'auto', marginTop: '2em' },
        width: this.size, height: this.size },
      'Page loading...'
    );
  };

  return Spinner;
}(_react.Component), _class.defaultProps = {
  size: 40,
  spinnerColor: '#333333',
  spinnerWidth: 5,
  visible: true
}, _temp);
exports.default = Spinner;
module.exports = exports['default'];