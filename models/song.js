module.exports = function (sequelize, DataTypes) {
    var Songs = sequelize.define("Songs", {

        artist: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        song_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
         }


    //     genre: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //         validate: {
    //             len: [1]
    //         }
    //     },
    //     track_id: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //         validate: {
    //             len: [1]
    //         }
    //     },
    //     album_art_url: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //         validate:{
    //             len: [1]
    //         }
    //     },
    //     playlist: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //         validate:{
    //             len: [1]
    //         }
    //     },

        
    });

    Songs.associate = function(models) {
        // We're saying that a Songs should belong to a User
        // Songs can't be created without a User due to the foreign key constraint
        Songs.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Songs;
};