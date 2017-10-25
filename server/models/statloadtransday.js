/**
 * Created by MAKS on 13.10.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var StatloadtransdayView = sequelize.define('StatloadtransdayView', {
        id:{type:DataTypes.BIGINT, primaryKey: true},
        devid: DataTypes.STRING,
        orgid: DataTypes.STRING,
        organization: DataTypes.STRING,
        recdate: DataTypes.DECIMAL,
        daysum: DataTypes.DECIMAL
    }, {
        freezeTableName: true
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return StatloadtransdayView;
};