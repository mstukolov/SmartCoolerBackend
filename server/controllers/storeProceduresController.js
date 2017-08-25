/**
 * Created by MAKS on 11.08.2017.
 */
'use strict';
var Sequelize = require('sequelize');
var sequelize =
    new Sequelize('mysql://admin:OPSGTCFHRBHCWYOV@sl-us-south-1-portal.4.dblayer.com:19500/compose', {dialect: 'mysql'});

module.exports =  {

    startProcedures(){
        sequelize.query('CALL Loadevents(NULL);').then(function(response){

                console.log('Success Loadevents(NULL)' + response);
                sequelize.query('call Loadcoolerstat(NULL);   ').then(function(response){
                    console.log('Success Loadcoolerstat(NULL)' + response);
                }).error(function(err){console.log('Fail Loadcoolerstat(NULL) ' + response);});

        }).error(function(err){console.log('Fail Loadevents(NULL) ' + response);});
    }

}