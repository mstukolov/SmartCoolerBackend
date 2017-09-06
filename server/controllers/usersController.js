/**
 * Created by MAKS on 06.07.2017.
 */
const Users = require('../models').Users;
const Organizations = require('../models').Organizations;
/*const Accessroles = require('../models').Accessroles;*/

Users.belongsTo(Organizations, {as: 'org'});
/*Users.belongsTo(Accessroles, {as: 'role'});*/
module.exports = {
    auth(req, res) {
        return Users
        .all({
            where:
                { user: {$eq:req.query.login},
                    password: {$eq:req.query.password}}})
             .then(function (user) {
                    if(user.length != 0) {
                        res.status(200).send({auth: 'allowed'})
                    } else {
                        res.status(400).send({auth: 'denied'})
                    }}).catch(error => res.status(400).send(error))
    },
    create(req, res) {
        return Users
                .create({
                    user: req.query.user || "new user",
                    password: req.query.password || "123456",
                    status: req.query.status || false,
                    orgid: req.query.orgid || 0,
                    roleid: req.query.roleid || 0
                })
                .then(res.redirect('/users'))
                .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Users
                .findById(req.query.recid)
                .then(user => {
                if (!user) { return res.status(404).send({
            message: 'User Not Found',
        });
        }
        return user
                .update({
                    user: req.query.user || user.user,
                    password: req.query.password || user.password,
                    status: req.query.status || user.status,
                    orgid: req.query.orgid || user.orgid,
                    roleid: req.query.roleid || user.roleid
                })
                .then(res.redirect('/users'))
                .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return Users
                .all()
                .then(list => res.status(200).render('users', {users : list }))
    .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Users
                .findById(req.query.recid)
                .then(user => {
                if (!user) {return res.status(404).send({message: 'Todo Not Found'})}
                    return res.status(200).send(user);})
                .catch(error => res.status(400).send(error))}
    ,
    destroy(req, res) {
        return Users
                .findById(req.query.recid)
                .then(user => {
                if (!user) {
                    return res.status(400).send({
                    message: 'Todo Not Found',
                });
        }
        return user
                .destroy()
                .then(res.redirect('/users'))
                .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
};
