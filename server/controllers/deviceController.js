/**
 * Created by MAKS on 31.07.2017.
 */
/**
 * Created by MAKS on 06.07.2017.
 */
//Инициализация IOT-сервиса
var ibmiotf = require("ibmiotf");
var config = {
    "org" : 'kwxqcy',
    "id" : 'a-kwxqcy-app689898',
    "domain": "internetofthings.ibmcloud.com",
    "auth-key" : 'a-kwxqcy-1dw7hvzvwk',
    "auth-token" : 'tsM8N(FS@iOc3CId+5'
}
var ibmiotfClient = new ibmiotf.IotfApplication(config);
ibmiotfClient.connect();

const Devices = require('../models').Devices;
const Organizations = require('../models').Organizations;
const Devicelasttransview = require('../models').Devicelasttransview;
Devices.belongsTo(Organizations, {as: 'org'});
Devices.belongsTo(Devicelasttransview, {as: 'lasttrans', foreignKey: 'devid', targetKey: 'devid'}/*, {as: 'lasttrans'}*/);

module.exports = {
    create(req, res) {
        return Devices
                .create({
                    orgid: req.query.organization || 57,
                    devid: req.query.devid || 'SmartCooler',
                    devtype: req.query.devtype || 'SmartCooler',
                    lng: req.query.lng || 0,
                    ltd: req.query.ltd || 0,
                    email: req.query.email || '',
                    qtyBottle: req.query.qtyBottle || 0,
                    name: req.query.name || '',
                    addhour: req.query.addhour || '+03:00',
                    address: req.query.address || ''
                })
                .then(device => {
                    device['devid'] = device.devid + device.id;
                    ibmiotfClient.registerDevice(device.devtype, device.devid,"12345678").then (function onSuccess (argument) {
                        console.log("Success"); console.log(argument);
                        res.render('device-details',{data: device, statusMessage : 'Устройство создано', statusEvent: 'alert-success',user:req.session.username })
                        }, function onError (argument) {
                        console.log("Fail"); console.log(argument.data);
                    })
                })
                .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Devices
                .findById(req.body.deviceid)
                .then(device => {if (!device) { return res.status(404).send({message: 'device Not Found',});}
                    return device.update({
                            orgid: req.body.orgid || device.orgid,
                            devtype: req.body.devtype || device.devtype,
                            lng: req.body.lng || device.lng,
                            ltd: req.body.ltd || device.ltd,
                            email: req.body.email || device.email,
                            name: req.body.name || device.name,
                            addhour: req.body.addhour || '+03:00',
                            address: req.body.address || device.address})
                        .then(res.status(200).send('success'))
                        .catch((error) => res.status(400).send(error));})
                        .catch((error) => res.status(400).send(error));
    },
    findOrganizationDevices(req, res) {
        return Devices
                .all(
                    {   attributes: ['id', 'name', 'devid', 'devtype',],
                        include: [
                                {model: Organizations, attributes: ['id', 'organization', 'parentorgid'], where: {parentorgid:{$eq: req.query.parentorgid}},as: 'org'},
                                {model: Devicelasttransview, attributes: ['nparam1', 'createdAt'], as: 'lasttrans'}
                            ]
                    })
                .then(data => res.status(200).send(data))
                .catch(error => res.status(400).send(error))
    },
    retrieve(req, res) {
        return Devices
                .findById(req.query.id)
                .then(device =>
            {if (!device) { return res.status(404).send({message: 'device Not Found',});}
                return res.status(200).send(device);
    })
    .catch(error => res.status(400).send(error));
    },
    findByName(req, res) {
        return Devices
                .findOne({
                    where: {devid: req.query.devid}
                })
                .then(device => {if (!device) { return res.status(404).send({message: 'device Not Found',});}
                        return res.status(200).send(device)}).catch(error => res.status(400).send(error));}
    ,
    getDeviceEmail(deviceid) {
        return Devices
            .findOne({
                where: {devid: deviceid}
            })
    },
    details(req, res) {
        return Devices
                .findOne({
                    include: [{model: Organizations, as: 'org'}],
                    where: {
                        $or:[{id: req.query.deviceid}, {devid: req.query.devid}]
                    }
                }).then(device =>
                    {if (!device) { return res.status(404).send({message: 'device Not Found',})}
                    return res.status(200).send(device);
    })
    .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Devices.findById(req.query.id).then(device => {if (!device) {return res.status(400).send({message: 'device Not Found'});}
        return device
                .destroy()
                .then(
                    ibmiotfClient.unregisterDevice(device.devtype, device.devid).
                    then (function onSuccess (response) {res.redirect('/devices')},
                            function onError (argument) {console.log("Fail");console.log(argument)}))
                .catch(error => res.status(400).send(error));})
                .catch(error => res.status(400).send(error));
    }
};
