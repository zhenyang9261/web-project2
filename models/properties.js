module.exports = function(sequelize, DataTypes) {
    var Properties = sequelize.define("Properties", {
        street: {
            type: DataTypes.STRING, 
            allowNull: false, 
             notEmpty: true,
        }, 
        city: {
            type: DataTypes.STRING, 
            allowNull: false, 
            notEmpty: true
        }, 
        zipCode: {
            type: DataTypes.STRING, 
            allowNull: false, 
            notEmpty: true,
            validate: {
                len: [5, 5], 
                isNumeric: true
            }
        }, 
        longitude: {
            type: DataTypes.FLOAT, 
            validate: {
                isFloat: true, 
            }
        }, 
        latitude: {
            type: DataTypes.FLOAT, 
            validate: {
                isFloat: true, 
            }
        }, 
        numBeds: {
            type: DataTypes.DECIMAL, 
            validate: {
                isDecimal: true
            }
        }, 
        numBathrooms: {
            type: DataTypes.DECIMAL, 
            validate: {
                isDecimal: true
            }
        }, 
        propertyType: {
            type: DataTypes.STRING, 
            defaultValue: "Single Family",
            validate: {
                notEmpty: true, 
            }
        },
        lotSize: {
            type: DataTypes.INTEGER, 
            validate: {
                isNumeric: true
            }
        }, 
        sqf: {
            type: DataTypes.INTEGER, 
            validate: {
                isNumeric: true
            }
        }, 
        yearBuilt: {
            type: DataTypes.INTEGER, 
            validate: {
                isNumeric: true
            }
        }, 
        price: {
            type: DataTypes.DECIMAL, 
            validate: {
                isDecimal: true
            }
        }, 
        lastSoldPrice: {
            type: DataTypes.DECIMAL, 
            validate: {
                isDecimal: true
            }
        }, 
        lastSoldDate: {
            type: DataTypes.DATEONLY, 
            validate: {
                isDate: true
            }
        }
    });

    Properties.associate = (models) => {
        Properties.belongsToMany(models.Users, {
            through: 'UsersProperties',
            as: 'Properties',
            foreignKey: 'propertyId', 
            onDelete: 'cascade'
        });
    }

    return Properties;
}