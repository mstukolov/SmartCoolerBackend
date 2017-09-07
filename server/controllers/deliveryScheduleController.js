/**
 * Created by MAKS on 07.09.2017.
 */
const DeliverySchedule = require('../models').DeliverySchedule;


module.exports = {
    update(req, res) {
        return DeliverySchedule
            .findOne({where: {orgid: {$eq: req.body.orgid}}})
            .then(item => {
                if (!item) { return res.status(404).send({message: 'User Not Found'})}
                return item
                    .update({
                        markmon: req.body.markmon,
                        marktue: req.body.marktue,
                        markwen: req.body.markwen,
                        markthu: req.body.markthu,
                        markfri: req.body.markfri
                    })
                    .then(item =>  res.status(200).send(item))
                    .catch((error) => res.status(400).send(error))})
                    .catch((error) => res.status(400).send(error));
    },
    retrieve(req, res) {
        return DeliverySchedule
            .all({attributes: ['id', 'orgid', 'markmon', 'marktue', 'markwen', 'markthu', 'markfri'] ,
                  where: {orgid: {$eq: req.query.orgid}}})
            .then(item => {
                if (!item) {return res.status(404).send({message: 'not found'})}
                return res.status(200).send(item);})
            .catch(error => res.status(400).send(error))}
    ,
    list(req, res) {
        return DeliverySchedule
            .all({attributes: ['id', 'orgid', 'markmon', 'marktue', 'markwen', 'markthu', 'markfri']})
            .then(list => res.status(200).send(list))
            .catch(error => res.status(400).send(error));
    },
}