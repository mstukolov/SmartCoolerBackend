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

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.static(__dirname + '/views'))

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', function(req, res) {
    res.render('index')
});
app.get('/transQty', function(req, res) {
    devicetransController.transQty(req, res)
});

//---------------Routing for Device Trans Table--------------------------------------
/*app.get('/createDeviceTransaction', function (req, res, next) {
    devicetransController.create(req, res)
});
app.get('/getAllDeviceTransactions', function (req, res, next) {
    devicetransController.listJson(req, res)
});*/
//-------------------------------------------------
module.exports = app;
