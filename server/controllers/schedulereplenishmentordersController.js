/**
 * Created by MAKS on 07.09.2017.
 */
const ScheduleReplenishmentOrders = require('../models').ScheduleReplenishmentOrders;

module.exports = {

    getAll(req, res) {
        return ScheduleReplenishmentOrders
            .all({
                attributes: ["id", "ordertype", "parentorgid", "orgid", "organization", "schedorderdate", "orderQty"],
                where:{parentorgid:req.query.parentorgid},
                order: [['organization', 'ASC'], ['ordertype', 'ASC'], ['schedorderdate', 'ASC']]
            })
            .then(list => res.status(200).send(list))
            .catch(error => res.status(400).send(error));
    }
}