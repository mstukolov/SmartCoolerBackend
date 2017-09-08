/**
 * Created by MAKS on 08.09.2017.
 */
const Ordersfullfillment = require('../models').Ordersfullfillment;

module.exports = {
    getAll(req, res){
            return Ordersfullfillment
                .all({
                    attributes:
                        [
                            "id",
                            "parentorgId",
                            "parentorganization",
                            "orgid",
                            "organization",
                            "orderdate",
                            "orderweekday",
                            "avgbottle",
                            "orderQty",
                            "realQty",
                            "insertdate"
                        ]
                })
                .then(data => res.status(200).send(data))
                .catch(error => res.status(400).send(error))
    }
}