'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nodeObserver = require('node-observer');

var _nodeObserver2 = _interopRequireDefault(_nodeObserver);

var _reactIdleTimer = require('react-idle-timer');

var _reactIdleTimer2 = _interopRequireDefault(_reactIdleTimer);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _api = require('./../api');

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SessionTimeOutObserver = function (_React$Component) {
  _inherits(SessionTimeOutObserver, _React$Component);

  function SessionTimeOutObserver(props) {
    _classCallCheck(this, SessionTimeOutObserver);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._onActive = function () {};

    _this.callSessionTimeoutOrchestrator = function () {
      if (_this.sessionExpired != true) {
        window.setTimeout(_this.callSessionTimeoutOrchestrator, _this.state.jsTimerIntervalInMilliseconds);
        var sessionExpiryPeriodInSeconds = _this.state.sessionExpiryPeriodInMinutes * 60;
        var sessionExpiryWarningAppearTimeInSeconds = sessionExpiryPeriodInSeconds * 84 / 100;

        var showSessionExpiredMessageVar = _this.findIfTimeExcededTheLimit(_this.state.lastAccessTS, sessionExpiryPeriodInSeconds);
        var showSessionGoingToExpireSoonMessageVar = _this.findIfTimeExcededTheLimit(_this.state.lastAccessTS, sessionExpiryWarningAppearTimeInSeconds);

        console.log("showSessionGoingToExpireSoonMessageVar - " + showSessionGoingToExpireSoonMessageVar);
        console.log("showSessionExpiredMessageVar - " + showSessionExpiredMessageVar);

        if (showSessionExpiredMessageVar) {
          _this.checkIfSessionExpired();
        } else if (showSessionGoingToExpireSoonMessageVar) {
          _this.showSessionGoingToExpireSoonMessage();
        }
      }
    };

    _this.findIfTimeExcededTheLimit = function (suppliedDate, limitSeconds) {

      if (suppliedDate == null || suppliedDate == undefined) {
        return false;
      }

      var nowMS = new Date().getTime();
      var suppliedDateMS = suppliedDate.getTime();

      if ((nowMS - suppliedDateMS) / 1000 > limitSeconds) {
        return true;
      }

      return false;
    };

    _this.showSessionGoingToExpireSoonMessage = function () {

      // var timeExceededLimit = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , 15 );

      if (_this.sessionExpired != true) {
        console.log('Session will expire');
        _this.open = true;
        _this.setState({ open: true,
          sessionExpriyDialogTitle: 'Your session is about to time out soon',
          sessionExpiryDialogStyle: { 'backgroundColor': 'none', 'height': 100, 'border': '2em', 'textAlign': 'center' },
          sessionExpiryMessageTxt: 'Your browser session is about to time out soon due to inactivity. Please choose to stay logged in or to logout . Otherwise, you will be timed out automatically.',
          button: { margin: 12 },
          actions: [_react2.default.createElement(_FlatButton2.default, {
            label: 'Log Out',
            primary: true,
            onClick: _this.logout }), _react2.default.createElement(_RaisedButton2.default, {
            label: 'Stay Logged In',
            labelPosition: 'before',
            primary: true,
            keyboardFocused: true,
            onClick: _this.handleContinueWithSession,
            style: _this.state.button })]
        });
      }
    };

    _this.checkIfSessionExpired = function () {
      console.log("checkIfSessionExpired - IN ");
      console.log("this.state.sessionExpired " + _this.state.sessionExpired);

      if (_this.sessionExpired != true) {
        (0, _api.ping)().then(function (data) {
          console.log("ping");
          console.log(data);
          //ping will revallidate the session, so no point keeping the 'sessionwillexpiresoon message'
          _this.setState({ open: false });
          _this.open = false;
        });
      }
    };

    _this.showSessionExpiredMessage = function () {
      console.log("showSessionExpiredMessage - IN ");
      _this.sessionExpired = true;
      _this.open = true;
      _this.setState({ open: true,
        sessionExpriyDialogTitle: 'Your session has timed out',
        sessionExpiryDialogStyle: { 'backgroundColor': '#cac8c8', 'height': 100, 'border': '2em', 'textAlign': 'center' },
        sessionExpiryMessageTxt: 'Please login again ',
        sessionExpired: true,
        lastAccessTS: _this.resetLastAccessTsToExpiredTs(),
        actions: [_react2.default.createElement(_FlatButton2.default, {
          label: 'Close',
          primary: true,
          onClick: _this.handleClose }), _react2.default.createElement(_RaisedButton2.default, {
          label: 'Login',
          labelPosition: 'before',
          primary: true,
          keyboardFocused: true,
          onClick: _this.handleExpiredSession,
          style: _this.state.button })]
      });
    };

    _this.handleContinueWithSession = function () {
      _this.setState({ open: false });
      _this.open = false;
      (0, _api.ping)();
      //make a rest service call to the server to keep the session active.
      console.log('handle continue with the current session');
    };

    _this.logout = function () {
      _this.setState({ open: false });
      _this.open = false;
      //logout
      console.log('logout');
      window.location.href = '/auth/faces/logout/';
    };

    _this.handleExpiredSession = function () {
      _this.setState({ open: false });
      _this.open = false;
      //redirect to login page
      console.log('handle expired session');
      window.location.href = '/portal';
    };

    _this.handleClose = function () {
      console.log('handle close');
      _this.setState({ open: false, sessionExpired: false });
      _this.open = false;
      _this.sessionExpired = false;
      console.log(_this.sessionExpired);
      setTimeout(_this.callSessionTimeoutOrchestrator, 20000);
    };

    _this.resetLastAccessTsToExpiredTs = function () {
      var MS_PER_MINUTE = 60000;
      var now = new Date();
      var lastAccessTimeStamp = new Date(now - 38 * MS_PER_MINUTE);
      return lastAccessTimeStamp;
    };

    _this.state = {
      open: false,
      sessionExpired: false,
      auskeyAuthentication: false,
      lastAccessTS: null,
      sessionExpiryPeriodInMinutes: props.sessionExpiryPeriodInMinutes || 37,
      jsTimerIntervalInMilliseconds: 50000
    };

    _this.sessionExpired = false;
    _this.open = false;
    return _this;
  }

  SessionTimeOutObserver.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    console.log(' getUserInfo ');

    (0, _api.getUserInfo)().then(function (data) {
      //ping will revallidate the session, so no point keeping the 'sessionwillexpiresoon message'
      _this2.setState({ auskeyAuthentication: data.auskeyAuthentication });
      console.log(data);
    });

    /*-  Every time a rest call is made (via api-> get, post, put etc) the timestamp is captured and published as an event 'send-last-access-ts' by the api code.
      -  The below piece of code is a subscirber which is listening to the publish event and gets the last access timestamp of any rest call to server
     */
    _nodeObserver2.default.subscribe('send-last-access-ts', "send-last-access-ts", function (who, data) {

      console.log('send-last-access-ts : received event');
      console.log(data);

      this.setState(function (prevState, props) {
        return {
          lastAccessTS: data.lastAccessTS
        };
      });
    }.bind(this));

    /*- Every time a rest call is made (via api-> get, post, put etc) and if the call results in an error then error is published as an event 'error-sender' by the api code.
      - The below piece of code is a subscirber which is listening to the publish event and gets the details of the error thrown by  the rest call to server.
      - If the error has an pattern of text which usually gets injected by the OAM then we assume that the session has expired and the error is caused by session timeout.
     */
    _nodeObserver2.default.subscribe("error-sender", "error", function (who, data) {

      console.log('error-sender : received event');
      console.log(data);

      if (data && data.indexOf('Your session has timed out') >= 0) {
        console.log('Session expired');
        this.showSessionExpiredMessage();
      }
    }.bind(this));

    this.callSessionTimeoutOrchestrator();
  };

  /*
     In order to find out if the session has actually expired , we make a rest service call. If session has expired then OAM will kick in and an exception will be published and it will get picked up by the corresponding listeners.
  */

  /*
         handleClose = () => {
              this.setState({open: false});
              console.log('handle close');
         }
  */

  SessionTimeOutObserver.prototype.render = function render() {

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _Dialog2.default,
        {
          title: this.state.sessionExpriyDialogTitle,
          actions: this.state.actions,
          modal: true,
          open: this.open },
        !this.state.sessionExpired && _react2.default.createElement(
          _Paper2.default,
          null,
          _react2.default.createElement(
            'div',
            { style: this.state.sessionExpiryDialogStyle },
            this.state.sessionExpiryMessageTxt
          )
        ),
        this.state.sessionExpired && this.state.auskeyAuthentication && _react2.default.createElement(
          'div',
          { className: 'message-container' },
          _react2.default.createElement(
            'div',
            { className: 'uikit-page-alerts uikit-page-alerts--error', role: 'alert' },
            _react2.default.createElement(
              'div',
              null,
              'Your session with the department online services has timed out. But your AUSkey session may still be active. Please click to ',
              _react2.default.createElement(
                'a',
                { href: '#', onClick: this.logout },
                'terminate your AUSKey session'
              ),
              ' '
            )
          )
        ),
        this.state.sessionExpired && !this.state.auskeyAuthentication && _react2.default.createElement(
          'div',
          { className: 'message-container' },
          _react2.default.createElement(
            'div',
            { className: 'uikit-page-alerts uikit-page-alerts--error', role: 'alert' },
            _react2.default.createElement(
              'div',
              null,
              'Your session with the department online services has timed out. Please login again.'
            )
          )
        )
      )
    );
  };

  return SessionTimeOutObserver;
}(_react2.default.Component);

exports.default = SessionTimeOutObserver;
module.exports = exports['default'];