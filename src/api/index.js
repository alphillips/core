import observer from 'node-observer'

export function get(url){
  observer.send('loading-sender', 'section-loading', {loading:true})
  return new Promise(
       (resolve, reject) => {
         fetch(url,{
           credentials: 'same-origin',
           headers: new Headers({
              'Cache-Control': 'no-cache, no-store',
              'Pragma':'no-cache'
            })
         }).then(
           response => {
             handleResponse(response, resolve, reject)
           }
         )
      }
    )
}

export function post(url, body, noJson){
  observer.send('loading-sender', 'section-loading', {loading:true})
  return new Promise(
     (resolve, reject) => {
       fetch(url,{
         method: 'POST',
         body: noJson ? body : JSON.stringify(body),
         credentials: 'same-origin',
         headers: new Headers({
            'Content-Type': 'application/json'
          })
       })
       .then(
         response => {
          handleResponse(response, resolve, reject)
         }
       )
    }
  )
}

export function formPost(url, body){
  observer.send('loading-sender', 'section-loading', {loading:true})
  return new Promise(
     (resolve, reject) => {
       fetch(url,{
         method: 'POST',
         body: body,
         credentials: 'same-origin'
       })
       .then(
         response => {
           handleResponse(response, resolve, reject)
         }
       )
    }
  )
}

export function del(url){
  observer.send('loading-sender', 'section-loading', {loading:true})
  return new Promise(
     (resolve, reject) => {
       fetch(url,{
         method: 'DELETE',
         credentials: 'same-origin',
         headers: new Headers({
            'Content-Type': 'application/json'
          })
       })
       .then(
         response => {
           handleResponse(response, resolve, reject)
         }
       )
    }
  )
}

export function put(url, body){
  observer.send('loading-sender', 'section-loading', {loading:true})
  return new Promise(
     (resolve, reject) => {
       fetch(url,{
         method: 'PUT',
         body: JSON.stringify(body),
         credentials: 'same-origin',
         headers: new Headers({
            'Content-Type': 'application/json'
          })
       })
       .then(
         response => {
           handleResponse(response, resolve, reject)
         }
       )
    }
  )
}

function handleResponse(response, resolve, reject){
  observer.send('loading-sender', 'section-loading', {loading:false})
  if (response.status === 200 ||  response.status === 201) {

    if(response.url && (JSON.stringify(response.url).indexOf('/auth/faces/public/login.jsf')>-1 || JSON.stringify(response.url).indexOf('/auth/faces/public/loggedin.jsf')>-1 || JSON.stringify(response.url).indexOf('/auth/faces/login')>-1 )) {
      observer.send('error-sender', 'error', 'Your session has timed out. Please <a href="/portal">login again</a>')
      reject(null)
    } else {
      response.text().then(data => {
        if(data){
          resolve(JSON.parse(data))
        } else {
          resolve()
        }
      });

    }


  } else {
     if(response.status === 302 || response.status === 501){
       // timeout
       // TODO: Send error to listener
       observer.send('error-sender', 'error', 'Your session has timed out. Please <a href="/portal">login again</a>')
       reject(null)
     } else if(response.status === 500){
       // 500 server error
       // Send error to listener in <Messages>
       observer.send('error-sender', "error", "The application has encountered an unknown error, please try again later.")
       reject(null)
     } else if(response.status === 400){
       // 400 bad request - should return error array DTO:
       //    [{"code": "640",
       //     "message": "Error text"}, ...]
       response.text().then(data => {
         try {
           let error = JSON.parse(data)
           if(error && error.length > 0){
             let messages = error.filter((e) => e.code != null).map((e) => e.message)
             let message = messages.join('\n')
             observer.send('error-sender', "error", message)
             window.scrollTo(0, 0)
           }
           reject(error)
         } catch(e){
           // TODO: if we can't parse data do we still sent a message to observer ?
           // If can not parse DTO just send null back
           reject(null)
         }
       });
     } else {
       observer.send('error-sender', "error", "The page has encountered an unknown error, please try again later.")
       reject(null)
     }
  }
}
