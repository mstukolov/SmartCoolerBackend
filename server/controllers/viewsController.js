/**
 * Created by MAKS on 15.08.2017.
 */
var sequelize = require('sequelize');
const Repmonthstat = require('../models').Repmonthstat;
const Repdaystat = require('../models').Repdaystat;
const Repquartstat = require('../models').Repquartstat;
const Repyearstat = require('../models').Repyearstat;

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
    reportDayAll(req, res) {
        return Repdaystat
            .all({
                attributes: ['recdate', [sequelize.fn('SUM', sequelize.col('valueend')), 'valueend'], [sequelize.fn('SUM', sequelize.col('valuein')), 'valuein']],
                group: ['recdate'],
                where: {
                    orgid:{$eq: req.query.orgid},
                    recdate: {$lt: req.query.end, $gt: req.query.start}},
                    order: [['recdate', 'ASC']]})
            .then(data => {
                data.forEach(function(entry) {
                    entry.valuein = parseFloat(entry.valuein)
                    entry.valueend = parseFloat(entry.valueend)
                });
                res.status(200).send(data)
            })
            .catch(error => res.status(400).send(error));
    },
    reportDayByDevice(req, res) {
        return Repdaystat
            .all({ attributes:
                ['devid', 'orgid', 'organization','recdate','recyear', 'recquart', 'recmonth',
                    'recmonthyear', 'valueout', 'valuein', 'valuestart', 'valueend', 'countevent'],
                where: {
                        devid: req.query.devid,
                        recdate: {$lt: req.query.end, $gt: req.query.start}},
                        order: [['recdate', 'ASC']]})
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
    reportQuart(req, res) {
        return Repquartstat
            .all({ attributes:
                ['devid', 'orgid', 'organization', 'recyear', 'recquart',
                    'valueout', 'valuein', 'valuestart', 'valueend', 'countevent']})
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
    reportYear(req, res) {
        return Repyearstat
            .all({ attributes:
                ['devid', 'orgid', 'organization', 'recyear',
                    'valueout', 'valuein', 'valuestart', 'valueend', 'countevent']})
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