'use strict';
module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define('Users', {
        recid:{type:DataTypes.BIGINT, primaryKey: true},
        user: DataTypes.STRING,
        password: DataTypes.STRING,
        orgid: DataTypes.BIGINT,
        roleid: DataTypes.BIGINT,
        status: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Users;
};
