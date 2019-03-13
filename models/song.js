module.exports = function (sequelize, DataTypes) {
    var Song = sequelize.define("Songs", {

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
    return Song;
};