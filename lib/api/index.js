'use strict';

exports.__esModule = true;
exports.get = get;
exports.post = post;
exports.formPost = formPost;
exports.del = del;
exports.put = put;

var _nodeObserver = require('node-observer');

var _nodeObserver2 = _interopRequireDefault(_nodeObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get(url) {
  _nodeObserver2.default.send('loading-sender', 'section-loading', { loading: true });
  return new Promise(function (resolve, reject) {
    fetch(url, {
      credentials: 'same-origin',
      headers: new Headers({
        'Cache-Control': 'no-cache, no-store',
        'Pragma': 'no-cache'
      })
    }).then(function (response) {
      handleResponse(response, resolve, reject);
    });
  });
}

function post(url, body, noJson) {
  _nodeObserver2.default.send('loading-sender', 'section-loading', { loading: true });
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'POST',
      body: noJson ? body : JSON.stringify(body),
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function (response) {
      handleResponse(response, resolve, reject);
    });
  });
}

function formPost(url, body) {
  _nodeObserver2.default.send('loading-sender', 'section-loading', { loading: true });
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'POST',
      body: body,
      credentials: 'same-origin'
    }).then(function (response) {
      handleResponse(response, resolve, reject);
    });
  });
}

function del(url) {
  _nodeObserver2.default.send('loading-sender', 'section-loading', { loading: true });
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function (response) {
      handleResponse(response, resolve, reject);
    });
  });
}

function put(url, body) {
  _nodeObserver2.default.send('loading-sender', 'section-loading', { loading: true });
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function (response) {
      handleResponse(response, resolve, reject);
    });
  });
}

function handleResponse(response, resolve, reject) {
  _nodeObserver2.default.send('loading-sender', 'section-loading', { loading: false });
  if (response.status === 200 || response.status === 201) {
    response.text().then(function (data) {
      if (data) {
        resolve(JSON.parse(data));
      } else {
        resolve();
      }
    });
  } else {
    if (response.status === 302) {
      // timeout
      // TODO: Send error to listener
      _nodeObserver2.default.send('error-sender', 'error', 'Your session has timed out. Please <a href="/">login again</a>');
      reject(null);
    } else if (response.status === 500) {
      // 500 server error
      // Send error to listener in <Messages>
      _nodeObserver2.default.send('error-sender', "error", "The application has encountered an unknown error, please try again later.");
      reject(null);
    } else if (response.status === 400) {
      // 400 bad request - should return error array DTO:
      //    [{"code": "640",
      //     "message": "Error text"}, ...]
      response.text().then(function (data) {
        try {
          var error = JSON.parse(data);
          if (error && error.length > 0) {
            var messages = error.filter(function (e) {
              return e.code != null;
            }).map(function (e) {
              return e.message;
            });
            var message = messages.join('\n');
            _nodeObserver2.default.send('error-sender', "error", message);
            window.scrollTo(0, 0);
          }
          reject(error);
        } catch (e) {
          // TODO: if we can't parse data do we still sent a message to observer ?
          // If can not parse DTO just send null back
          reject(null);
        }
      });
    } else {
      _nodeObserver2.default.send('error-sender', "error", "The page has encountered an unknown error, please try again later.");
      reject(null);
    }
  }
}