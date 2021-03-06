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
const replenishmentController = require(__dirname + '/server/controllers/replenishmentController');
const deviceController = require(__dirname + '/server/controllers/deviceController');
const usersController = require(__dirname + '/server/controllers/usersController');
const deliveryScheduleController = require(__dirname + '/server/controllers/deliveryScheduleController');
const schedulereplenishmentordersController = require(__dirname + '/server/controllers/schedulereplenishmentordersController');
const notificationController = require(__dirname + '/server/controllers/notificationController');
const ordersfullfillmentController = require(__dirname + '/server/controllers/ordersfullfillmentController');

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
let allowedOrigins = [
                        /*'http://89.169.3.101',
                        'http://192.168.1.7:3000',
                        'http://192.168.1.8:3000',
                        'http://5.101.205.14:3000',
                        'http://10.0.0.48:3000',*/
                        'http://89.169.3.101',
                        'http://192.168.1.8:3000',
                        'http://smartcooler-lk.mybluemix.net'
                        ]
var allowCrossDomain = function(req, res, next) {
   var origin = req.headers.origin;
   /*if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin)
   }*/

    //res.header('Access-Control-Allow-Origin', 'https://smartcooler-lk.mybluemix.net');
    res.header('Access-Control-Allow-Origin', '*');
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
    /*res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-  Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');*/
    devicelasttransController.listView(req, res)
});
app.get('/statloadtranshour', function(req, res) {
   devicelasttransController.statloadtranshourView(req, res)
});
app.get('/statloadtransday', function(req, res) {
    devicelasttransController.statloadtransDayView(req, res)
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
    organizationController.findOrganizationCustomers(req, res)
});
app.get('/organization-details', function(req, res) {
    organizationController.details(req, res)
});
app.post('/save-organization-details', function(req, res) {
    organizationController.update(req, res)
});
app.post('/create-organization', function(req, res) {
    organizationController.create(req, res)
});

app.post('/delete-organization', function(req, res) {
    organizationController.destroy(req, res)
});

app.get('/replenishment', function(req, res) {
    replenishmentController.getAllOrders(req, res)
});
app.get('/replenishment-schedule', function(req, res) {
    schedulereplenishmentordersController.getAll(req, res)
});

app.get('/devices', function(req, res) {
    deviceController.findOrganizationDevices(req, res)
});
app.get('/device-details', function(req, res) {
    deviceController.details(req, res)
});
app.post('/save-device-details', function(req, res) {
    deviceController.update(req, res)
});

app.get('/check-auth', function(req, res) {
    usersController.auth(req, res)
});

app.get('/get-deliveryschedule', function(req, res) {
    deliveryScheduleController.retrieve(req, res)
});
app.post('/update-deliveryschedule', function(req, res) {
    deliveryScheduleController.update(req, res)
});
app.get('/findall-deliveryschedule', function(req, res) {
    deliveryScheduleController.list(req, res)
});
app.post('/send-mail-notification', function(req, res) {
    notificationController.sendMailNotification(req, res)
});
app.get('/fulfillment-orders', function(req, res) {
    ordersfullfillmentController.getAll(req, res)
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

var callChangeBottleNotification = setInterval(function(){storeProceduresController.periodicChangeBottleRequireNotification()}, 1000*60*60*8);
module.exports = app;
