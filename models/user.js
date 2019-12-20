module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING(40), 
        firstName: DataTypes.STRING(40)
    });

    return User;
};