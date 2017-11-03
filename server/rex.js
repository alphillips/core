var formidable = require('formidable')
var fs = require('fs')
var path = require('path')

module.exports = function(app) {

  var rexHistory =
[
  {
    "rexNumber": "REX0010063154",
    "status": "DRAFT",
    "createdTimestamp": "2017-10-16T15:42:26.498",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH",
    "exporterName": null,
    "exporterReference": null
  },
  {
    "rexNumber": "REX0010063121",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T15:30:47.261",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010063139",
    "status": "CERTIFICATE READY",
    "createdTimestamp": "2017-10-16T15:30:47.261",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010063105",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T15:18:41.851",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010063113",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T15:18:41.851",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010063097",
    "status": "DRAFT",
    "createdTimestamp": "2017-10-16T15:02:54.284",
    "destinationCountry": "ARGENTINA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": null
  },
  {
    "rexNumber": "REX0010063071",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T14:49:13.01",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010063089",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T14:49:13.01",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010063055",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T14:41:47.696",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010063063",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T14:41:47.696",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010063030",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T14:15:56.073",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ABC"
  },
  {
    "rexNumber": "REX0010063022",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T14:12:10.188",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ABC"
  },
  {
    "rexNumber": "REX0010062990",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T14:02:37.613",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ABC"
  },
  {
    "rexNumber": "REX0010062958",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T12:12:43.268",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010062941",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T12:12:43.268",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010062933",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T12:12:43.268",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010062925",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T12:08:11.313",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010062917",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T12:02:34.334",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010062909",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T12:01:16.041",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  },
  {
    "rexNumber": "REX0010062768",
    "status": "COMPLETED",
    "createdTimestamp": "2017-10-16T09:17:22.29",
    "destinationCountry": "AUSTRIA",
    "consigneeName": "MITCH HALEY",
    "exporterName": null,
    "exporterReference": "ANNETTE-01"
  }
]
  var rex =
  {
     "messages": [],
     "rexNumber": "REX0010063154",
     "status": "ORDER",
     "country": "KR",
     "lineItems": [   {
        "product": "JUI",
        "packType": "BO",
        "preservationCode": "U",
        "suppCode": null,
        "productCategoryCode": "OT0012",
        "lineNumber": 1,
        "packaging":       {
           "inner": null,
           "outer": null,
           "intermediate": null
        },
        "manufacturer": null,
        "treatments": [],
        "container": null,
        "weightDetails":       {
           "grossMetricWeight": null,
           "netImperialWeight": null,
           "netMetricWeight": null
        },
        "customsInformation":       {
           "customsMeasurement": null,
           "aheccCode": "03048900",
           "fobAmount": null
        },
        "certificates": [      {
           "certificateType": "EX188",
           "certificateReason": null
        }],
        "documents": [],
        "durabilityStartDate": null,
        "durabilityEndDate": null,
        "importAuthorityCode": null
     }],
     "referenceNumber": null,
     "customsIndicator": false
  }

var rexLineItemSummary =
  [{"rexNumber":"REX0010063154","lineNumber":1,"productDescription":"Mango Juice","productQuantity":700,"unit":"Kilogram"}]

var rexCertList =
  {"6357":"","6358":""}


  app.get('/v1/rex/:id', function (req, res) {
    res.status(200).json(rex)
  })

  app.post('/v1/rex/:rex/copy', function (req, res) {
    res.status(200).json(rex)
  })
  app.get('/v1/rex/history', function (req, res) {
    res.status(200).json(rexHistory)
  })
  app.get('/v1/rex/:rex/lineitemsummary', function (req, res) {
    res.status(200).json(rexLineItemSummary)
  })
  app.get('/v1/rex/:rex/certificate/list', function (req, res) {
    res.status(200).json(rexCertList)
  })

};
