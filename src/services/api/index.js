
const URL_BASE = (process.env.API_HOST || '') + '/api/'
// const URL_BASE = '/api/'

function get(url){
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
             if (response.status === 200) {
               response.text().then(data => {
                 if(data){
                   resolve(JSON.parse(data))
                 } else {
                   resolve()
                 }
               });
             } else {
                 response.text().then(data => {
                   try {
                     let error = JSON.parse(data)
                     reject(error)
                   } catch(e){
                     reject('Error parsing data from server')
                   }
                 });
             }
           }
         )
      }
    )
}

function post(url, body, noJson){
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
           if (response.status === 200 || response.status === 201) {
             response.text().then(data => {
               try{
                 resolve(JSON.parse(data))
               } catch(e){
                 resolve(data)
               }
             });
           } else {
               response.text().then(data => {
                 try {
                   let error = JSON.parse(data)
                   reject(error)
                 } catch(e){
                   reject('Error parsing data from server')
                 }
               });

           }
         }
       )
    }
  )
}


function formPost(url, body){
  return new Promise(
     (resolve, reject) => {
       fetch(url,{
         method: 'POST',
         body: body,
         credentials: 'same-origin'
       })
       .then(
         response => {
           if (response.status === 200 || response.status === 201) {
             response.text().then(data => {
               try{
                 resolve(JSON.parse(data))
               } catch(e){
                 resolve(data)
               }
             });
           } else {
               response.text().then(data => {
                 try {
                   let error = JSON.parse(data)
                   reject(error)
                 } catch(e){
                   reject('Error parsing data from server')
                 }
               });

           }
         }
       )
    }
  )
}

function del(url){
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
           if (response.status === 200 || response.status === 202) {
             response.text().then(data => {
               resolve(data)
             });
           } else {

               response.text().then(data => {
                 try {
                   let error = JSON.parse(data)
                   reject(error)
                 } catch(e){
                   reject('Error parsing data from server')
                 }
               });

           }
         }
       )
    }
  )
}

function put(url, body){
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
           if (response.status === 200 || response.status === 201) {
             response.text().then(data => {
               resolve(data)
             });
           } else {
             response.text().then(data => {
               try {
                 let error = JSON.parse(data)
                 reject(error)
               } catch(e){
                 reject('Error parsing data from server')
               }
             });
           }
         }
       )
    }
  )
}

export function getRex(id, page) {
  let extra = page ? '/' + page : ''
  return get(URL_BASE + 'v1/rex/' + id + extra)
}

export function startRex(obj) {
  return post(URL_BASE + 'v1/rex', obj)
}

export function saveRex(rexNumber, obj, page) {
  return put(URL_BASE + 'v1/rex/' + rexNumber + '/' + (page || ''), obj)
}

export function getExporters(id) {
  return get(URL_BASE + 'v1/rex/exporter/' + (id || ''))
}

export function getAddressbook(id) {
  return get(URL_BASE + 'v1/rex/address-book/' + (id || ''))
}

export function getCertificate(rexNumber, id) {
  return get(URL_BASE + 'v1/rex/' + rexNumber + '/certificate/' + (id || ''))
}

export function saveCertificate(rexNumber, data, id) {
  let url = URL_BASE + 'v1/rex/' + rexNumber + '/certificate/'
  return id ? put(url, data) : post(url, data)
}

export function getImportPermit(rexNumber, id) {
  return get(URL_BASE + 'v1/rex/' + rexNumber + '/importpermit/' + (id || ''))
}

export function saveImportPermit(rexNumber, data, id) {
  let url = URL_BASE + 'v1/rex/' + rexNumber + '/importpermit/'
  return id ? put(url, data) : post(url, data)
}

export function getAttachment(rexNumber, id) {
  return get(URL_BASE + 'v1/rex/' + rexNumber + '/document/' + (id || ''))
}

export function saveAttachment(rexNumber, data, id) {
  let url = URL_BASE + 'v1/rex/' + rexNumber + '/document/' + (id || '')
  return id ? put(url, data) : post(url, data)
}

export function deleteAttachment(rexNumber, id) {
  let url = URL_BASE + 'v1/rex/' + rexNumber + '/document/' + id
  return del(url)
}

export function getLineItem(rexNumber, id) {
  return get(URL_BASE + 'v1/rex/' + rexNumber + '/lineitem/' + (id || ''))
}

export function saveLineItem(rexNumber, data, id) {
  let url = URL_BASE + 'v1/rex/' + rexNumber + '/lineitem/' + (id || '')
  return id ? put(url, data) : post(url, data)
}

export function deleteLineItem(rexNumber, id) {
  let url = URL_BASE + 'v1/rex/' + rexNumber + '/lineitem/' + (id || '')
  return del(url)
}

export function fileUpload(rexNumber, file){
  let formData = new FormData();
  formData.append('file', file);

  return formPost(URL_BASE + 'v1/rex/' + rexNumber + '/document/fileupload/', formData)

}

export function lodge(rexNumber){
  let url = URL_BASE + 'v1/rex/' + rexNumber + '/lodge'
  return post(url, '', true)
}

export function getUser() {
  return get(URL_BASE + 'v1/user/')
}

export function getAllRexs() {
  return get(URL_BASE + 'v1/rex/history')
}

export function getAllCerts() {
  return get(URL_BASE + 'v1/certificate')
}

export function getEndorsements(rexNumber) {
  return get(URL_BASE + 'v1/rex/' + rexNumber + '/endorsement')
}

export function getEndorsement(rexNumber, lineItem) {
  return get(URL_BASE + 'v1/rex/' + rexNumber + '/endorsement/lineitem/' + lineItem)
}

export function saveEndorsement(rexNumber, data) {
  let url = URL_BASE + 'v1/rex/' + rexNumber + '/endorsement/'
  return put(url, data)
}
