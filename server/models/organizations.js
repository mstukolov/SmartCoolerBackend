'use strict';
module.exports = function(sequelize, DataTypes) {
  var Organizations = sequelize.define('Organizations', {
    id:{type:DataTypes.BIGINT, primaryKey: true},
    organization: DataTypes.STRING,
    parentorgId: DataTypes.BIGINT,
    active: DataTypes.BOOLEAN,
    agreement: DataTypes.STRING,
    agreementDate: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    contact: DataTypes.STRING,
    inventQty:  DataTypes.BIGINT,
    currQty:  DataTypes.BIGINT,
    updatedQty: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return Organizations;
};