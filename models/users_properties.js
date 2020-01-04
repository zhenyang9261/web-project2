module.exports = function(sequelize, DataTypes) {
  var Users_Properties = sequelize.define(
    "Users_Properties",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Properties",
          key: "id"
        }
      }
    },
    { timestamps: false }
  );
  return Users_Properties;
};
