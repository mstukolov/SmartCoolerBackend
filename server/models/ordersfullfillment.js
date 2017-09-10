/**
 * Created by MAKS on 08.09.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var OrdersFullfillment = sequelize.define('OrdersFullfillment', {
        id:{type:DataTypes.BIGINT, primaryKey: true},
        parentorgid: DataTypes.BIGINT,
        parentorganization: DataTypes.STRING,
        orgid: DataTypes.STRING,
        organization: DataTypes.STRING,
        orderdate: DataTypes.DATE,
        orderweekday: DataTypes.STRING,
        avgbottle: DataTypes.BIGINT,
        orderQty: DataTypes.BIGINT,
        realQty: DataTypes.BIGINT,
        insertdate:  DataTypes.DATE
    },
        {freezeTableName: true},{
        classMethods: {
            associate: function(models) {

            }
        }
    });
    return OrdersFullfillment;
};