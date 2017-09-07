/**
 * Created by MAKS on 07.09.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var DeliverySchedule = sequelize.define('DeliverySchedule', {
        id:{type:DataTypes.BIGINT, primaryKey: true},
        orgid: DataTypes.BIGINT,
        markmon: DataTypes.BIGINT,
        marktue: DataTypes.BIGINT,
        markwen: DataTypes.BIGINT,
        markthu: DataTypes.BIGINT,
        markfri: DataTypes.BIGINT
    }, {freezeTableName: true},
    {
        classMethods: {
            associate: function(models) {

            }
        }
    });
    return DeliverySchedule;
};