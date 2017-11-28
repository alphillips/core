import observer from 'node-observer';

export function get(url) {
  observer.send('loading-sender', 'section-loading', { loading: true });
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

export function post(url, body, noJson) {
  observer.send('loading-sender', 'section-loading', { loading: true });
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

export function formPost(url, body) {
  observer.send('loading-sender', 'section-loading', { loading: true });
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

export function del(url) {
  observer.send('loading-sender', 'section-loading', { loading: true });
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

export function put(url, body) {
  observer.send('loading-sender', 'section-loading', { loading: true });
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
  observer.send('loading-sender', 'section-loading', { loading: false });
  if (response.status === 200 || response.status === 201) {

    if (response.url && JSON.stringify(response.url).indexOf('/auth/faces/public/login.jsf') === 1) {
      observer.send('error-sender', 'error', 'Your session has timed out. Please <a href="/">login again</a>');
      reject(null);
    } else {
      response.text().then(function (data) {
        if (data) {
          resolve(JSON.parse(data));
        } else {
          resolve();
        }
      });
    }
  } else {
    if (response.status === 302 || response.status === 501) {
      // timeout
      // TODO: Send error to listener
      observer.send('error-sender', 'error', 'Your session has timed out. Please <a href="/">login again</a>');
      reject(null);
    } else if (response.status === 500) {
      // 500 server error
      // Send error to listener in <Messages>
      observer.send('error-sender', "error", "The application has encountered an unknown error, please try again later.");
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
            observer.send('error-sender', "error", message);
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
      observer.send('error-sender', "error", "The page has encountered an unknown error, please try again later.");
      reject(null);
    }
  }
}