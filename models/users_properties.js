module.exports = function(sequelize, DataTypes) {
    var UsersProperties = sequelize.define('UsersProperties', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Properties',
          key: 'id'
        }
      }
    });
    return UsersProperties;
  };