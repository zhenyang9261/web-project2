module.exports = function(sequelize, DataTypes) {
    var Messages = sequelize.define("Messages", {
        text: {
            type: DataTypes.TEXT('tiny'), 
            allowNull: false
        }, 
        recipientId: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            validate: {
                isNumeric: true
            }
        }
    });

    Messages.associate = (models) => {
        Messages.belongsToMany(models.Users, {
            through: 'UsersMessages', 
            foreignKey: 'messageId', 
            onDelete: 'cascade'
        })
    }

    return Messages;
}