/**
 * Created by MAKS on 29.08.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Replenishmentorders = sequelize.define('Replenishmentorders', {
        id:{type:DataTypes.BIGINT, primaryKey: true},
        ordertype: DataTypes.STRING,
        parentorgid: DataTypes.DECIMAL,
        parentorganization: DataTypes.STRING,
        orgid: DataTypes.DECIMAL,
        organization: DataTypes.STRING,
        orderdate: DataTypes.DATE,
        orderweekday: DataTypes.STRING,
        orderqty: DataTypes.BIGINT
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Replenishmentorders;
};