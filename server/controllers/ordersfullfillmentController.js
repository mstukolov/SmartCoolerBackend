/**
 * Created by MAKS on 08.09.2017.
 */
const OrdersFullfillment = require('../models').OrdersFullfillment;

module.exports = {
    getAll(req, res){
            return OrdersFullfillment
                .all({
                    where:{parentorgid:req.query.parentorgid},
                    attributes: ["id", "parentorgid", "parentorganization", "orgid", "organization",
                            "orderdate","orderweekday", "avgbottle", "orderQty", "realQty", "insertdate"]
                })
                .then(data => res.status(200).send(data))
                .catch(error => res.status(400).send(error))
    },
}