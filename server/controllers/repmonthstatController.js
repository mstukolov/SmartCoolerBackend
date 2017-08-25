/**
 * Created by MAKS on 15.08.2017.
 */
const Repmonthstat = require('../models').Repmonthstat;
const Repdaystat = require('../models').Repdaystat;
module.exports = {
    reportMonth(req, res) {
        return Repmonthstat
            .all({ attributes:
                ['devid', 'orgid', 'organization', 'recyear', 'recquart', 'recmonth',
                'recmonthyear', 'valueout', 'valuein', 'valuestart', 'valueend', 'countevent']})
            .then(data => {
                data.forEach(function(entry) {
                    entry.valueout = parseFloat(entry.valueout)
                    entry.valuein = parseFloat(entry.valuein)
                    entry.valuestart = parseFloat(entry.valuestart)
                    entry.valueend = parseFloat(entry.valueend)
                    entry.countevent = parseFloat(entry.countevent)
                });
                res.status(200).send(data)
            })
            .catch(error => res.status(400).send(error));
    },
    reportDay(req, res) {
        return Repdaystat
            .all({ attributes:
                ['devid', 'orgid', 'organization', 'recyear', 'recquart', 'recmonth',
                    'recmonthyear', 'valueout', 'valuein', 'valuestart', 'valueend', 'countevent']})
            .then(data => {
                data.forEach(function(entry) {
                    entry.valueout = parseFloat(entry.valueout)
                    entry.valuein = parseFloat(entry.valuein)
                    entry.valuestart = parseFloat(entry.valuestart)
                    entry.valueend = parseFloat(entry.valueend)
                    entry.countevent = parseFloat(entry.countevent)
                });
                res.status(200).send(data)
            })
            .catch(error => res.status(400).send(error));
    },
};