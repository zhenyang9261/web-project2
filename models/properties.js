module.exports = function(sequelize, DataTypes) {
  var Properties = sequelize.define(
    "Properties",
    {
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      stateCode: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      numBeds: DataTypes.INTEGER,
      numBathrooms: DataTypes.INTEGER,
      propertyType: DataTypes.STRING,
      numStories: DataTypes.INTEGER,
      sqf: DataTypes.INTEGER,
      yearBuilt: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      picURL: DataTypes.STRING
    },
    { timestamps: false }
  );
  return Properties;
};
