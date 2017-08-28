/**
 * Created by MAKS on 06.07.2017.
 */
const Organizations = require('../models').Organizations;
Organizations.belongsTo(Organizations, {as: 'parentorg'});

module.exports = {
    create(req, res) {
        return Organizations
                .create({
                    organization: req.query.organization || 'new orgs',
                    parentorgId: 0,
                    active: 'Блокирован'
                })
        .then(res.redirect('/organizations'))
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Organizations
                .findOne({
                    include: [{model: Organizations, as: 'parentorg'}],
                    where: {id: req.body.orgId}
                })
                .then(organization => {
                    if (!organization) { return res.status(404).send({message: 'Organization Not Found'});}
                    return organization
                    .update({
                        organization: req.body.name || organization.organization,
                        parentorgId: req.body.parent_id || organization.parent,
                        active: req.body.active || organization.active,
                        inventQty: req.body.inventQty || organization.inventQty,
                        agreement: req.body.agreement || organization.agreement,
                        agreementDate: req.body.agreementDate || organization.agreementDate,
                        email: req.body.email || organization.email,
                        phone: req.body.phone || organization.phone,
                        contact: req.body.contact || organization.contact
                    })
                    .then(organization =>
                        {
                        res.render('organization-details',{data: organization, statusMessage : 'Успешно сохранено', statusEvent: 'alert-success',user:req.session.username })
                        }
                    )
                    .catch((error) => res.status(400).send(error))})
                    .catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return Organizations
                .all({include: [{model: Organizations, as: 'parentorg'}]})
                .then(list => res.status(200).render('organizations', {orglist: list, user:req.session.username}))
                .catch(error => res.status(400).send(error));
    },
    listRaw(req, res) {
        return Organizations
                .all({attributes: ["id", "organization"], where:{id:{$ne: 0}}})
                .then(list => res.status(200).send(list))
                .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Organizations
                .findOne({
                    include: [{model: Organizations, as: 'parentorg'}],
                    where: {id: req.query.orgId}
                })
                .then(organization => {
                if (!organization) {return res.status(404).send({message: 'Todo Not Found',});}
                return res.status(200).send(organization)
                })
                .catch(error => res.status(400).send(error));}
    ,
    details(req, res) {
        return Organizations
                .findOne({
                    include: [{model: Organizations, as: 'parentorg'}],
                    where: {id: req.query.orgId}
                })
                .then(organization =>
            {if (!organization) { return res.status(404).send({message: 'device Not Found',})}
        return res.status(200).render('organization-details', {data : organization, statusMessage : '', statusEvent: '', user:req.session.username });
    })
    .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Organizations
                .findById(req.query.orgId)
                .then(organization => {
                if (!organization) {
                    return res.status(400).send({
                        message: 'Todo Not Found',
                    });
                }
                return organization
                .destroy()
                .then(res.redirect('/organizations'))
                .catch(error =>
                    {
                        res.status(400).send(error)
                    }
                )}).catch(error => res.status(400).send(error))}
};
