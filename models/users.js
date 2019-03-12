module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                isEmail: true
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return User;
};