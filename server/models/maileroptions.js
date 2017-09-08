/**
 * Created by MAKS on 08.09.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Maileroptions = sequelize.define('Maileroptions', {
        id:{type:DataTypes.BIGINT, primaryKey: true},
        mailtype: DataTypes.STRING,
        destination: DataTypes.STRING,
        subject: DataTypes.STRING,
        host: DataTypes.STRING,
        host_port: DataTypes.DATE,
        host_login: DataTypes.STRING,
        host_pwd: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });
    return Maileroptions;
};