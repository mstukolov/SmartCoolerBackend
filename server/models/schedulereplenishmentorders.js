/**
 * Created by MAKS on 07.09.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var ScheduleReplenishmentOrders = sequelize.define('ScheduleReplenishmentOrders', {
        ordertype: DataTypes.DECIMAL,
        orgid: DataTypes.DECIMAL,
        parentorgid: DataTypes.DECIMAL,
        organization: DataTypes.STRING,
        schedorderdate: DataTypes.DATE,
        orderQty: DataTypes.DECIMAL
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return ScheduleReplenishmentOrders;
};