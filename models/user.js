module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING(), 
        firstName: DataTypes.STRING(40), 
        lastName: DataTypes.STRING(40) 
    });

    return User;
};