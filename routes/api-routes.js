var db = require("../models")

module.exports = function(app){
    app.get("/api/songs", function(req, res){
        db.Song.findAll({}).then(function(dbSongs){
            res.json(dbSongs)
        })
    });

    app.get("/api/songs/:id", function(req, res){
        var id = req.params.id
        db.Song.findOne({
            where: {
                id: id
            }
        }).then(function(dbSong){
            res.json(dbSong)
        })
    });

    app.post("/api/songs", function(req, res){
        db.Song.create(req.body).then(function(dbSongs){
            res.json(dbSongs)
        })
    });

    app.delete("/api/songs/:id", function(req, res){
        var id = req.params.id
        db.Song.destroy({
            where:{
                id:id
            }
        }).then(function(dbSongs){
            res.json(dbSongs)
        })
    });
}