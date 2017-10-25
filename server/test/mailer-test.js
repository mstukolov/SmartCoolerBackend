/**
 * Created by MAKS on 24.10.2017.
 */
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    //auth: { user: "Maxim.Stukolov@center2m.ru", pass: "node2017!"},
    auth: { user: "data@center2m.ru", pass: "ZA23CD34qa12"},
    secureConnection: true,
    tls: { ciphers: 'SSLv3' }
})
var mailOptions = {
    from: '"C2M SmartCooler Change Bottle Service " <data@center2m.ru>', // sender address
    to: "Maxim.Stukolov@center2m.ru", // list of receivers
    subject: "Требуется смена бутылки", // Subject line
    html: "Требуется смена бутылки" // html body
}
transporter.sendMail(mailOptions, function () {
    console.log("Письмо о смене бутылки отправлено.....")
});