/**
 * Created by MAKS on 15.08.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Repquartstat = sequelize.define('Repquartstat', {
        devid:{type:DataTypes.BIGINT, primaryKey: true},
        orgid: DataTypes.STRING,
        organization: DataTypes.DECIMAL,
        recyear: DataTypes.DECIMAL,
        recquart: DataTypes.DECIMAL,
        recmonth: DataTypes.DECIMAL,
        recmonthyear: DataTypes.DECIMAL,
        valueout: DataTypes.STRING,
        valuein: DataTypes.STRING,
        valuestart:DataTypes.DECIMAL,
        valueend:DataTypes.DECIMAL,
        countevent:DataTypes.DECIMAL
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Repquartstat;
};