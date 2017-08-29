/**
 * Created by MAKS on 31.07.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Devices = sequelize.define('Devices', {
        id:{type:DataTypes.BIGINT, primaryKey: true,autoIncrement: true},
        orgid: DataTypes.STRING,
        devid: DataTypes.STRING,
        devtype: DataTypes.STRING,
        lng: DataTypes.FLOAT,
        ltd: DataTypes.FLOAT,
        email: DataTypes.STRING,
        qtyBottle: DataTypes.BIGINT,
        name: DataTypes.STRING,
        addhour: DataTypes.STRING,
        address: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });
    return Devices;
};
