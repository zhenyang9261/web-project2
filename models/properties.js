module.exports = function(sequelize, DataTypes) {
  var Properties = sequelize.define(
    "Properties",
    {
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      stateCode: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      numBeds: DataTypes.FLOAT,
      numBaths: DataTypes.FLOAT,
      propertyType: DataTypes.STRING,
      sqf: DataTypes.INTEGER,
      yearBuilt: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      picURL: DataTypes.STRING
    },
    { timestamps: false }
  );
  return Properties;
};
