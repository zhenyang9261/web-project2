module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
              isEmail: true
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
              notEmpty: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                not: ['[a-z]', 'i']
            }
        },
        firstName: DataTypes.STRING(40), 
        lastName: DataTypes.STRING(40), 
        type: DataTypes.ENUM({
            values: ["buyer", "seller", "realtor"]
        }),
    });
    Users.associate = (models) => {
        Users.belongsToMany(models.Properties, {
          through: 'UsersProperties',
          as: 'Properties',
          foreignKey: 'userId', 
          onDelete: 'cascade'
        });
      };

    return Users;
};