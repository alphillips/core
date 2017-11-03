var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router();

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./ex-application.js')(router);
require('./user.js')(router);
require('./refdata-options.js')(router);
require('./rex.js')(router);

app.use('/nexdoc/api',router);

app.use(express.static('build'))

app.listen(process.env.PORT || 3001, function () {
  console.log('Listening on port ' + (process.env.PORT || 3001))
})
