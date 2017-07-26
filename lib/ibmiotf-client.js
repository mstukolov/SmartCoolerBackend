/**
 * Created by MAKS on 26.07.2017.
 */
console.log('ibmiotf-client is started')
var path = require('path')
var iotfService = require("ibmiotf");
var appClientConfig = {
    "org" : 'kwxqcy',
    "id" : 'a-kwxqcy-app8888',
    "domain": "internetofthings.ibmcloud.com",
    "auth-key" : 'a-kwxqcy-1dw7hvzvwk',
    "auth-token" : 'tsM8N(FS@iOc3CId+5'
}

const devicetransController = require(path.join(__dirname, '..', '/server/controllers/devicetransController')) ;
const eventsController = require(path.join(__dirname, '..', '/server/controllers/eventsController')) ;

var appClient = new iotfService.IotfApplication(appClientConfig);
appClient.connect();
appClient.on("connect", function () {
    appClient.subscribeToDeviceEvents("SmartCooler","+","+","json");
});

appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
    console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
    json = JSON.parse(payload)

    var _previousValue = devicetransController.getDeviceLastValue(deviceId).then(
        result => {
            if(result != null){
                eventDeviceDefinition(result['dataValues']['nparam1'], json)
            }else{
                devicetransController.saveTransaction(
                    json['d']['deviceid'],
                    json['d']['param1'],
                    json['d']['param2'],
                    json['d']['param3'] || 0,
                    json['d']['param4'] || 0,
                    json['d']['param5'] || 0,
                    json['d']['tparam1'] || 0,
                    json['d']['tparam2'] || 0
                )}
            }

    );
});
//Бизнес-логика, отвечающая за определение типа события по изменению веса
function eventDeviceDefinition(_previousValue, json){

    var  delta = json['d']['param1'] - _previousValue;
    var maxDelta = 1.5
    _vmax = json['d']['param2'];

    if(  delta > 0){
        //console.log("Произошла смена бутылки");
        if( delta  >= _vmax * 0.95 && delta <= _vmax * 1.05){
            eventsController.create( json['d']['deviceid'], 'changeBottle', json['d']['param1'], _previousValue)
        }
        if( delta  < _vmax * 0.98 || delta  >= _vmax * 1.02){
            //console.log("Кто-то надавил на кулер. Warning!!!");
            //mailerClient.sender("Кто-то надавил на кулер. Warning!!!");
        }
    }else if( (-1)*maxDelta < delta && delta < 0){
        //console.log("Кто-то отлил водички");
        //mailerClient.sender("Кто-то отлил водички");
    }else if( delta == 0){
        //console.log("Объем воды не изменился");
        //mailerClient.sender("Кто-то отлил водички");
    }
    devicetransController.saveTransaction(
                                            json['d']['deviceid'],
                                            json['d']['param1'],
                                            json['d']['param2'],
                                            json['d']['param3'] || 0,
                                            json['d']['param4'] || 0,
                                            json['d']['param5'] || 0,
                                            json['d']['tparam1'] || 0,
                                            json['d']['tparam2'] || 0
    )
}
module.exports = function (app) {

}