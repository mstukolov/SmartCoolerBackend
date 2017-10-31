/**
 * Created by MAKS on 11.08.2017.
 */
'use strict';
var path = require('path')
var Sequelize = require('sequelize');
var sequelize =
    new Sequelize('mysql://admin:OPSGTCFHRBHCWYOV@sl-us-south-1-portal.4.dblayer.com:19500/compose', {dialect: 'mysql'});
const notificationController = require(path.join(__dirname, '..', '/controllers/notificationController')) ;

module.exports =  {

    startProcedures(){
        sequelize.query('CALL Loadevents(NULL);').then(function(response){

                console.log('Success Loadevents(NULL)' + response);
                sequelize.query('call Loadcoolerstat(NULL);   ').then(function(response){
                    console.log('Success Loadcoolerstat(NULL)' + response);
                }).error(function(err){console.log('Fail Loadcoolerstat(NULL) ' + response);});

        }).error(function(err){console.log('Fail Loadevents(NULL) ' + response);});
    },
    periodicChangeBottleRequireNotification(){
        console.log('periodicChangeBottleRequireNotification started')

        sequelize.query('select devid, nparam1, nparam2, nparam1/nparam2 as delta, createdAt from Devicelasttrans;')
            .then(function(response){

                response[0].map(function (item) {
                    if(parseFloat(item.delta) < 0.01){
                        console.log('Пустая бутылка:' + item.devid + ',' + item.delta);
                        notificationController.sendChangeBottleRequireNotification(item.devid, item.nparam1)
                    }

                })


        }).error(function(err){console.log('Fail Loadevents(NULL) ' + response);});

    }

}