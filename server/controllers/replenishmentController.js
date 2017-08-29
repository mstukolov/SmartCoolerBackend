/**
 * Created by MAKS on 29.08.2017.
 */
const Replenishmentorders = require('../models').Replenishmentorders;

module.exports = {

    getAllOrders(req, res) {
        return Replenishmentorders
            .all({
                attributes: ["id", "ordertype", "parentorgid", "orgid", "organization", "orderdate", "orderweekday", "orderqty"],
                where:{parentorgid:req.query.parentorgid},
                order: [['organization', 'ASC'], ['ordertype', 'ASC'], ['orderdate', 'ASC']]
            })
            .then(list => res.status(200).send(list))
            .catch(error => res.status(400).send(error));
    }
}