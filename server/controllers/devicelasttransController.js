/**
 * Created by MAKS on 04.08.2017.
 */
const Devicelasttrans = require('../models').Devicelasttrans;

module.exports = {
    deleteAndCreate(devid, nparam1, nparam2, nparam3, nparam4, nparam5, tparam1, tparam2) {
        Devicelasttrans.destroy({
            where: {
                devid: devid
            }
        })
        Devicelasttrans
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
    list(req, res) {
        return Devicelasttrans
                .all({ attributes: ['devid', 'nparam1', 'nparam2']})
                .then(data => {
                    data.forEach(function(entry) {
                        entry.nparam1 = parseFloat(entry.nparam1)
                        entry.nparam2 = parseFloat(entry.nparam2)
                    });
                    res.status(200).send(data)
                })
    .catch(error => res.status(400).send(error));
    },
};