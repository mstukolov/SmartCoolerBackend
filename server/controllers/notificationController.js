/**
 * Created by MAKS on 08.09.2017.
 */
'use strict'
const nodemailer = require('nodemailer');
const Maileroptions = require('../models').Maileroptions;
const deviceController = require(__dirname + '/deviceController');


module.exports = {
    sendMailNotification(req, res){

        var messageText = 'Organization: ' + req.body.orgid +'<br/>' +
                            'Contact: ' + req.body.contact +'<br/>' +
                                req.body.messageText;
        var mailtype = req.body.mailtype

        return Maileroptions
            .findOne({
                attributes:['mailtype', 'destination', 'subject', 'host', 'host_port', 'host_login', 'host_pwd'],
                where: {mailtype: {$eq: mailtype}}
            }).then(entry => {
                var transporter = nodemailer.createTransport({
                    host: entry.host,
                    port: entry.host_port,
                    auth: { user: entry.host_login, pass: entry.host_pwd},
                    secureConnection: true,
                    tls: { ciphers: 'SSLv3' }
                })
                var mailOptions = {
                    from: '"C2M SmartCooler Request Service " <'+ entry.host_login + '>', // sender address
                    to: entry.destination, // list of receivers
                    subject: entry.subject, // Subject line
                    html: messageText // html body
                }
                transporter.sendMail(mailOptions, function () {
                    res.status(200).send('email sent success')
                });
            }).catch(error => res.status(400).send(error));
    },
    sendChangeBottleRequireNotification(deviceid, curValue){
        var device = deviceController.getDeviceEmail(deviceid)
        device.then(device => {
            var transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: "587",
                auth: { user: "data@center2m.ru", pass: "ZA23CD34qa12"},
                secureConnection: true,
                tls: { ciphers: 'SSLv3' }
            })
            var mailOptions = {
                from: '"C2M SmartCooler Change Bottle Service " <data@center2m.ru>', // sender address
                to: device['email'], // list of receivers
                subject: "Требуется смена бутылки:" + deviceid, // Subject line
                html: "Для устройства:" +
                                deviceid+ " (" + device['name'] + ")" + " требуется смена бутылки. Осталось: " + curValue + "л."// html body
            }
            transporter.sendMail(mailOptions, function () {
                console.log("Письмо о смене бутылки отправлено.....")
            });

        })
    },

}