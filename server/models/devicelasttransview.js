/**
 * Created by MAKS on 13.10.2017.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Devicelasttransview = sequelize.define('Devicelasttransview', {
        id:{type:DataTypes.BIGINT, primaryKey: true},
        devid: DataTypes.STRING,
        nparam1: DataTypes.DECIMAL,
        nparam2: DataTypes.DECIMAL,
        nparam3: DataTypes.DECIMAL,
        nparam4: DataTypes.DECIMAL,
        nparam5: DataTypes.DECIMAL,
        tparam1: DataTypes.DECIMAL,
        tparam2: DataTypes.DECIMAL,
        orgid: DataTypes.DECIMAL,
        organization: DataTypes.DECIMAL
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Devicelasttransview;
};