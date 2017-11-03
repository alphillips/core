var formidable = require('formidable')
var fs = require('fs')
var path = require('path')

module.exports = function(app) {

  var application = []
  var lineItemIds = []//1
  var lineNumbers = []//0
  var docIds = []//1
  var attachmentId = []

  var consigneeAddressbookList = []
  var address1 = {
    id:1,
    name: 'John Smith',
    phone: '0415 572 395',
    referenceNumber:'X-11119',
    agentNumber:'20999901',
    address:{
      addressline1:'1 Smith St',
      addressline2:'',
      addressline3:'',
      city:'Smithville',
      state:'ACT',
      postcode:'2600',
      country:'AU'
    }
  }
  var address2 = {
    id:2,
    name: 'Aiko Hagaki',
    phone: '0415 572 395',
    referenceNumber:'X-2637323',
    agentNumber:'211134',
    address:{
      addressline1:'7 Honmachi',
      addressline2:'',
      addressline3:'',
      city:'Shibuya-ku',
      state:'Tōkyō-to',
      postcode:'151-0071',
      country:'JP'
    }
  }
  consigneeAddressbookList.push(address1)
  consigneeAddressbookList.push(address2)

  var exporterList = []
  var exporter1 = {
    exporterId:1,
    tradingName: 'John Citizen',
    emailAddress: 'john.citizen@example.com',
    phoneNumber:'(02) 6124 6755',
    address:{
      addressline1:'1 Smith St',
      addressline2:'',
      addressline3:'',
      city:'Smithville',
      state:'ACT',
      postcode:'2600',
      country:'AU'
    }
  }

  var exporter2 = {
    exporterId:2,
    tradingName: 'Smitherson Ltd',
    emailAddress: 'smithy@smitherson.com',
    phoneNumber:'(02) 6124 6743',
    address:{
      addressline1:'1 Smith St',
      addressline2:'',
      addressline3:'',
      city:'Smithville',
      state:'ACT',
      postcode:'2600',
      country:'AU'
    }
  }
  exporterList.push(exporter1)
  exporterList.push(exporter2)

  app.get('/v1/rex/address-book', function (req, res) {
    res.status(200).json(consigneeAddressbookList)
  })

  app.get('/v1/rex/address-book/:id', function (req, res) {
    var consignee = {}
    consigneeAddressbookList.map(function(item){
      if(item.id === parseInt(req.params.id,10)){
        consignee = item
      }
    })
    res.json(consignee)
  })


  app.get('/v1/rex/exporter', function (req, res) {
    res.status(200).json(exporterList)
  })

  app.get('/v1/rex/exporter/:id', function (req, res) {
    var exporter = {}
    exporterList.map(function(item){
      if(item.id === parseInt(req.params.id,10)){
        exporter = item
      }
    })
    res.json(exporter)
  })

  app.get('/v1/rex/:rex/exporter', function (req, res) {
    res.status(200).json(exporterList[0])
  })

  app.put('/v1/rex/:rex/exporter', function (req, res) {
    res.status(200).end()
  })

  app.get('/v1/rex/:id', function (req, res) {
    res.json(application[req.params.id])
  })

  app.get('/v1/rex/:id/transport', function (req, res) {
    res.json(application[req.params.id])
  })

  app.get('/v1/rex/:id/consignee', function (req, res) {
    res.json(application[req.params.id])
  })

  app.get('/v1/rex/:id/certificate', function (req, res) {
    res.json(application[req.params.id])
  })

  app.get('/v1/rex/:id/lineitem/:lineItemId', function (req, res) {
    var lineItem = {}
    application[req.params.id].lineItems.map(function(item){
      if(parseInt(item.id,10) === parseInt(req.params.lineItemId,10)){
        lineItem = item
      }
    })
    res.json(lineItem)
  })

  app.put('/v1/rex/:id/lineitem/:lineItemId', function (req, res) {
    //var lineItem = {}
    application[req.params.id].lineItems = application[req.params.id].lineItems.map(function(item){
      if(parseInt(item.id,10) === parseInt(req.params.lineItemId,10)){
        var newItem = req.body
        newItem.lineNumber = item.lineNumber
        return newItem
      }
      return item
    })
    res.status(200).end()
  })

  app.delete('/v1/rex/:id/lineitem/:lineItemId', function (req, res) {
    //var lineItem = {}
    // delete application[req.params.id][req.params.lineItemId]
    application[req.params.id].lineItems = application[req.params.id].lineItems.filter(function(item){
      if(parseInt(item.id,10) !== parseInt(req.params.lineItemId,10)){
        return item
      }

    })
    res.status(200).end()
  })

  app.post('/v1/rex/:id/lineitem/', function (req, res) {
    if(!application[req.params.id].lineItems){
      application[req.params.id].lineItems = []
    }
    var lineItem = req.body
    var len = application[req.params.id].lineItems.length
    len ++
    lineItem.id =  len
    lineItem.lineNumber =  len
    application[req.params.id].lineItems.push(lineItem)
    res.status(200).json(application[req.params.id])
  })



  app.post('/v1/rex/:id/document/fileupload', function(req, res){
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function(err, fields, files) {
      // console.log(files)
      // console.log(files.file)
      var file = files.file

      // var tempPath = file.path;
      // var TARGET_PATH = path.resolve(__dirname, '../public/');
      // var targetPath = path.join(TARGET_PATH, file.name);
      //
      // var is = fs.createReadStream(tempPath);
      // var os = fs.createWriteStream(targetPath);
      // is.pipe(os);
      // // file write error
      // is.on('error', function(err) {
      //     if (err) {
      //       console.log(err);
      //     }
      //   });
      // // file end
      // is.on('end', function() {
      // //delete file from temp folder
      //   fs.unlink(tempPath, function(err) {
      //     if (err) {
      //       return res.send(500, 'Something went wrong');
      //     }
      //   });
      // });

    });
    var obj = {}
    obj.id = 123456
    res.status(200).json(obj)
  })




  app.get('/v1/rex/:id/document/:docId', function (req, res) {
    var doc = {}
    if(!application[req.params.id].documents){
      application[req.params.id].documents = []
    }
    application[req.params.id].documents.map(function(item){
      if(parseInt(item.id,10) === parseInt(req.params.docId,10)){
        doc = item
      }
    })
    res.json(doc)
  })

  app.post('/v1/rex/:id/document/', function (req, res) {
    if(!application[req.params.id].documents){
      application[req.params.id].documents = []
      //docIds[req.params.id] = 0
    }
    var doc = req.body
    var len = application[req.params.id].documents.length
    len ++
    doc.id = len
    //doc.lineNumber = ++ lineNumbers
    // application.lineItems[lineItem.id] = lineItem
    application[req.params.id].documents.push(doc)
    res.status(200).json(application[req.params.id])
  })

  app.put('/v1/rex/:id/document/:documentId', function (req, res) {
    //var lineItem = {}
    application[req.params.id].documents = application[req.params.id].documents.map(function(item){
      if(parseInt(item.id,10) === parseInt(req.params.documentId,10)){
        var newItem = req.body
        newItem.id = item.id
        return newItem
      }
      return item
    })
    res.status(200).end()
  })



  app.get('/v1/rex/:id/certificate/:docId', function (req, res) {
    var doc = {}
    if(!application[req.params.id].certificates){
      application[req.params.id].certificates = []
    }
    application[req.params.id].certificates.map(function(item){
      if(parseInt(item.id,10) === parseInt(req.params.docId,10)){
        doc = item
      }
    })
    res.json(doc)
  })

  app.post('/v1/rex/:id/certificate/', function (req, res) {
    if(!application[req.params.id].certificates){
      application[req.params.id].certificates = []
      //attachmentId[req.params.id] = 0
    }
    var doc = req.body
    var len = application[req.params.id].certificates.length
    len ++
    doc.id = len
    //doc.lineNumber = ++ lineNumbers
    // application.lineItems[lineItem.id] = lineItem
    application[req.params.id].certificates.push(doc)
    res.status(200).json(application[req.params.id])
  })

  app.put('/v1/rex/:id/certificate/:certificateId', function (req, res) {
    //var lineItem = {}
    application[req.params.id].certificates = application[req.params.id].certificates.map(function(item){
      if(parseInt(item.id,10) === parseInt(req.params.certificateId,10)){
        var newItem = req.body
        newItem.id = item.id
        return newItem
      }
      return item
    })
    res.status(200).end()
  })







  // app.put('/ex-application/:id/lineitem/:lineItemId', function (req, res) {
  //   if(!application.lineItems){
  //     application.lineItems = []
  //   }
  //   application.lineItems[req.params.lineItemId] = req.body
  //   res.status(200).json(obj)
  // })

  app.post('/v1/rex', function (req, res) {
/*
    var obj = [
      {
      "code": null,
      "message": "it is not true that the commodity type order rules are satisfied.",
      "fieldName": "8d4f06d4-b891-4517-b310-63ae2b19ba27",
      "messageParameters": [null],
      "error": true,
      "severity": "ERROR",
      "warning": false
   },
      {
      "code": null,
      "message": "The commodity type is X.",
      "fieldName": "commodity_type",
      "messageParameters": ["X"],
      "error": true,
      "severity": "ERROR",
      "warning": false
   },
      {
      "code": null,
      "message": "it is not true that the other goods commodity order rules are satisfied.",
      "fieldName": "cf000898-da92-4697-ae2d-9c22eff2dea3",
      "messageParameters": [null],
      "error": true,
      "severity": "ERROR",
      "warning": false
   },
      {
      "code": null,
      "message": "The line items other goods order rules are not satisfied.",
      "fieldName": "f3ac5e0f-3cfa-41fe-9e58-eac7b9ecfe40",
      "messageParameters": [null],
      "error": true,
      "severity": "ERROR",
      "warning": false
   },
      {
      "code": null,
      "message": "The line items containers are not only present if transport is sea or air.",
      "fieldName": "7ec07655-ffc1-496f-a10b-24b077d1aaba",
      "messageParameters": [null],
      "error": true,
      "severity": "ERROR",
      "warning": false
   },
      {
      "code": "640",
      "message": "Container Numbers only permitted where Transport Mode = SEA or AIR.",
      "fieldName": null,
      "messageParameters": [null],
      "error": true,
      "severity": "ERROR",
      "warning": false
   },
      {
      "code": null,
      "message": "The transport mode is 2.",
      "fieldName": "transport_mode",
      "messageParameters": ["2"],
      "error": true,
      "severity": "ERROR",
      "warning": false
   },
      {
      "code": "640",
      "message": "Container Numbers only permitted where Transport Mode = SEA or AIR.",
      "fieldName": null,
      "messageParameters": [null],
      "error": true,
      "severity": "ERROR",
      "warning": false
   },
      {
      "code": null,
      "message": "The line items other goods order rules are not satisfied.",
      "fieldName": "f3ac5e0f-3cfa-41fe-9e58-eac7b9ecfe40",
      "messageParameters": [null],
      "error": true,
      "severity": "ERROR",
      "warning": false
   },
      {
      "code": null,
      "message": "The line items containers are not only present if transport is sea or air.",
      "fieldName": "7ec07655-ffc1-496f-a10b-24b077d1aaba",
      "messageParameters": [null],
      "error": true,
      "severity": "ERROR",
      "warning": false
   }
]

    res.status(300).json(obj)
    return
*/
    //Math.floor(Math.random() * 100000000)
    var rexNumber = 'EX-' + Math.floor(Math.random() * 100000000)

    application[rexNumber] = req.body
    application[rexNumber].lineItems[0].id = 1
    application[rexNumber].lineItems[0].lineNumber = 1
    // lineNumbers = 1
    application[rexNumber].rexNumber = rexNumber //'EX-123456'
    application[rexNumber].status = 'DRAFT'
    res.status(201).json(application[rexNumber])
  })

  app.put('/v1/rex/:id/*', function (req, res) {
    //application[req.params.type] = req.body
    var body = req.body
    for (var key in body) {
      if (body.hasOwnProperty(key)) {
        //console.log(key + " -> " + body[key]);
        application[req.params.id][key] = body[key]
      }
    }
    res.status(200).end()
  })

};
