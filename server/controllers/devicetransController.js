/**
 * Created by MAKS on 26.07.2017.
 */
const Devicetrans = require('../models').Devicetrans;

module.exports = {
    getDeviceLastValue(deviceId){
       return Devicetrans
                .findOne({
                    where: {
                        devid: deviceId
                    },
                    order: [ [ 'createdAt', 'DESC' ]],
                })
                .catch(error => console.log(error));
    },
    transQty(req, res){
        return Devicetrans
                .findAndCountAll()
                .then(result =>
                    res.status(200).send('Total qty: ' + result.count)
                )
                .catch(error => console.log(error));
    },
    saveTransaction(devid, nparam1, nparam2, nparam3, nparam4, nparam5, tparam1, tparam2) {
        Devicetrans
                .create({
                    devid: devid,
                    nparam1: nparam1,
                    nparam2: nparam2,
                    nparam3: nparam3,
                    nparam4: nparam4,
                    nparam5: nparam5,
                    tparam1: tparam1,
                    tparam2: tparam2
                })
                .then(
                    console.log('Entity success saved')
                )
                .catch(error => console.log(error));
    },
    listJson(req, res) {
        return Devicetrans
                .all()
                .then(list => res.status(200).send(list))
    .catch(error => res.status(400).send(error));
    }
};