/**
 * Created by MAKS on 13.10.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Statloadtranshour = sequelize.define('Statloadtranshour', {
        id:{type:DataTypes.BIGINT, primaryKey: true},
        devid: DataTypes.STRING,
        recdate: DataTypes.DECIMAL,
        recdatehour: DataTypes.DECIMAL,
        recyear: DataTypes.DECIMAL,
        recquart: DataTypes.DECIMAL,
        recmonth: DataTypes.DECIMAL,
        recday: DataTypes.DECIMAL,
        recmonthyear: DataTypes.DECIMAL,
        recweekday: DataTypes.DECIMAL,
        recweeknum: DataTypes.DECIMAL,
        rechour: DataTypes.DECIMAL,
        countevent: DataTypes.DECIMAL,
        insertdate: DataTypes.DECIMAL
    }, {
        freezeTableName: true
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Statloadtranshour;
};