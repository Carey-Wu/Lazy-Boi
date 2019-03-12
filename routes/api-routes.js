var db = require("../models")

module.exports = function(app){
    app.get("/api/songs", function(req, res){
        db.Song.findAll({}).then(function(dbSongs){
            res.json(dbSongs)
        })
    });

    app.get("/api/users", function(req, res){
        db.User.findAll({}).then(function(dbUsers){
            res.json(dbUsers)
        })
    })

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

    app.put("/api/users/:id"), function(req, res){
        db.User.update(
            {active: true},
            {where: {id: req.params.id}}
        )
        .then(function(dbUser){
            res.json(dbUser)
        })
    }

    app.post("/api/songs", function(req, res){
        db.Song.create(req.body).then(function(dbSongs){
            res.json(dbSongs)
        })
    });

    app.post("/api/users", function(req, res){
        db.User.create(req.body).then(function(dbUsers){
            res.json(dbUsers)
        })
    })

    app.put("/api/users", function(req, res){
        db.User.update(
            {active: req.body.active},
            {where: {id: req.body.id}}
        )
        .then(function(dbUser){
            res.json(dbUser)
        })
    })    

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