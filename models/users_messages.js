module.exports = function(sequelize, DataTypes) {
    var UsersMessages = sequelize.define('UsersMessages', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Messages',
          key: 'id'
        }
      }
    });
    return UsersMessages;
    
  };