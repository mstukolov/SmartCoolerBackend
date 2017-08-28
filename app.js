/**
 * Created by MAKS on 26.07.2017.
 */
'use strict'
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var path = require('path')

// Set up the express app
const app = express();
const devicetransController = require(__dirname + '/server/controllers/devicetransController');
const devicelasttransController = require(__dirname + '/server/controllers/devicelasttransController');
const storeProceduresController = require(__dirname + '/server/controllers/storeProceduresController');
const viewsController = require(__dirname + '/server/controllers/viewsController');
const organizationController = require(__dirname + '/server/controllers/organizationController');

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.static(__dirname + '/views'))

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://10.0.0.48:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', function(req, res) {
    res.render('index')
});
app.get('/transQty', function(req, res) {
    devicetransController.transQty(req, res)
});
app.get('/getlasttrans', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-  Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    devicelasttransController.list(req, res)
});

app.get('/repmonthstats', function(req, res) {
    viewsController.reportMonthAggregate(req, res)
});
app.get('/repdaystats', function(req, res) {
    viewsController.reportDayAggregate(req, res)
});
app.get('/repquartstats', function(req, res) {
    viewsController.reportQuartAggregate(req, res)
});
app.get('/repyeartstats', function(req, res) {
    viewsController.reportYearAggregate(req, res)
});
app.get('/organizations', function(req, res) {
    organizationController.listRaw(req, res)
});

//---------------Routing for Device Trans Table--------------------------------------
/*app.get('/createDeviceTransaction', function (req, res, next) {
    devicetransController.create(req, res)
});
app.get('/getAllDeviceTransactions', function (req, res, next) {
    devicetransController.listJson(req, res)
});*/
//-------------------------------------------------

var callMySQLProcedures = setInterval(function(){storeProceduresController.startProcedures()}, 1000*60*60*12);

module.exports = app;
