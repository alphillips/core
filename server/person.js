var formidable = require('formidable')
var fs = require('fs')
var path = require('path')

var persons = []

var p1 = {id:1,name:'John Smith', email:'js@gmail.com'}
var p2 = {id:2,name:'Jack Frost', email:'jf@gmail.com'}

persons.push(p1)
persons.push(p2)

module.exports = function(app) {

  app.get('/v1/person', function (req, res) {
    res.json(persons)
  })

  app.get('/v1/person/:id', function (req, res) {
    var person = {}
    // persons.map(function(item){
    //   if(item.id === parseInt(req.params.id,10)){
    //     person = item
    //   }
    // })
    res.json(persons[req.params.id-1])

  })

  app.put('/v1/person/:id', function (req, res) {
    persons[req.params.id-1] = req.body
    // persons.map(function(item){
    //   if(item.id === parseInt(req.params.id,10)){
    //     item = req.body
    //   }
    // })
    res.status(200).end()
  })

}
