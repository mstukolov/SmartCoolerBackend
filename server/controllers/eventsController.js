/**
 * Created by MAKS on 26.07.2017.
 */
const Deviceevents = require('../models').Deviceevents;
module.exports = {
    transQty(req, res){
        return Deviceevents
                .findAndCountAll()
                .then(result =>
            res.status(200).send('Total qty: ' + result.count)
    )
    .catch(error => console.log(error));
    },
    create(devid, eventtype, nparam1, nparam2) {
        return Deviceevents
                .create({
                    devid: devid,
                    eventtype: eventtype,
                    nparam1: nparam1 || 0,
                    nparam2: nparam2 || 0
                })
                .then(
                    console.log('Entity success saved')
                )
                .catch(error => console.log(error));
    }
};