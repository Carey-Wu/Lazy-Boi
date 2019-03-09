$(document).ready(function () {
    var searchURL = "";
    var query = "";
    var apiKey = ""
    var napsterQuery = ""
    var type = ""

    $("#mu-music-results").hide()
    $("#trackResults").hide()
    $("#albumResults").hide()
    $("#artistResults").hide()

    console.log("connected")
    $("#searchTrack").on("click", function (event) {
        $("#trackResults").hide()
        $("#albumResults").hide()
        $("#artistResults").hide()

        event.preventDefault()

        query = $("#query").val();
        

        if (query.includes(" ")) {
            query = query.split(" ").join("+");
            console.log(query);
        } else {
            console.log("no-space");
        }
        searchURL="http://api.napster.com/v2.2/search?";
        apiKey= "apikey=MjM3OTI0OGMtZTVjOS00OTAwLTg4MDgtYjFjOWRkNmUxNWZi"
        napsterQuery=searchURL + apiKey + "&query=" + query + "&type=track&per_type_limit=5";
        console.log(napsterQuery);

        $.get(napsterQuery).then(function (result) {
            console.log(result.search.data)
            var trackResults = result.search.data.tracks
            $("#trackResults").empty()

            for(var i=0; i < trackResults.length; i ++){
                console.log(trackResults[i])

                var infoDiv = $("<div></div>")
                infoDiv.attr("class", "card col-md-12")

                var cardBody = $("<div></div>")
                cardBody.attr("class", "card-body")

                var title = $("<h3></h3>")
                title.attr("class", "card-title")

                var artist = $("<h4></h4>")
                var album = $("<h4></h4>")

                title.text(trackResults[i].name)
                artist.text("Artist: " + trackResults[i].artistName)
                album.text("Album: " + trackResults[i].albumName)

                var playButton = $("<button>Play Song!</button>")
                var addButton = $("<button>Add to Playlist!</button>")
                playButton.attr("class", "btn btn-success")
                addButton.attr("class", "btn btn-success")

                title.appendTo(cardBody)
                artist.appendTo(cardBody)
                album.appendTo(cardBody)

                playButton.appendTo(cardBody)
                addButton.appendTo(cardBody)

                cardBody.appendTo(infoDiv)
                infoDiv.appendTo($("#trackResults"))
            }
        })
        $("#mu-music-results").show()
        $("#trackResults").show()

    })

    $("#searchArtist").on("click", function (event) {
        $("#trackResults").hide()
        $("#albumResults").hide()
        $("#artistResults").hide()

        $("#artistResults").empty()

        event.preventDefault()
        query = $("#query").val();
        

        if (query.includes(" ")) {
            query = query.split(" ").join("+");
            console.log(query);
        } else {
            console.log("no-space");
        }
        searchURL="http://api.napster.com/v2.2/search?";
        apiKey= "apikey=MjM3OTI0OGMtZTVjOS00OTAwLTg4MDgtYjFjOWRkNmUxNWZi"
        napsterQuery=searchURL + apiKey + "&query=" + query + "&type=artist&per_type_limit=1";
        console.log(napsterQuery);

        $.get(napsterQuery).then(function (result) {
            console.log(result.search.data)
            var artistResult = result.search.data.artists[0]
            var artist_id = artistResult.id

//-------------------------------title card-------------------------------------------------
            var infoDiv = $("<div></div>")
            infoDiv.attr("class", "card col-md-12")

            var cardBody = $("<div></div>")
            cardBody.attr("class", "card-body")

            var title = $("<h2></h2>")
            title.attr("class", "card-title")
            title.text(artistResult.name)

            var img = $("<img></img>")
            var imgSrc = "https://direct.napster.com/imageserver/v2/artists/" + artist_id + "/images/633x422.jpg"
            img.attr("src", imgSrc)
            console.log("imgSrc: " + imgSrc)

            title.appendTo(cardBody)
            img.appendTo(cardBody)
            cardBody.appendTo(infoDiv)
//==================================title card end//tracks card start=================================
            var tracksQuery = artistResult.links.topTracks.href + "?"+ apiKey + "&limit=5"
            console.log("tracksQuery: " + tracksQuery)

            $.get(tracksQuery).then(function(results){
                var tracks = results.tracks

                for(var i = 0; i <tracks.length; i++){
                var trackDiv = $("<div></div>")
                trackDiv.attr("class", "card col-md-12")

                var trackBody = $("<div></div>")
                trackBody.attr("class", "card-body")

                var title = $("<h3></h3>")
                title.attr("class", "card-title")

                var album = $("<h4></h4>")

                title.text(tracks[i].name)
                album.text("Album: " + tracks[i].albumName)

                var playButton = $("<button>Play Song!</button>")
                var addButton = $("<button>Add to Playlist!</button>")
                playButton.attr("class", "btn btn-success")
                addButton.attr("class", "btn btn-success")

                title.appendTo(trackBody)
                album.appendTo(trackBody)

                playButton.appendTo(trackBody)
                addButton.appendTo(trackBody)

                trackBody.appendTo(trackDiv)
                trackDiv.appendTo($("#artistResults"))

                }
            })

//=============================tracks card end=====================================================
            infoDiv.appendTo($("#artistResults"))
            
        })
        $("#mu-music-results").show()
        $("#artistResults").show()
    })

    $("#searchAlbum").on("click", function (event) {
        event.preventDefault()
        query = $("#query").val();
        

        if (query.includes(" ")) {
            query = query.split(" ").join("+");
            console.log(query);
        } else {
            console.log("no-space");
        }
        searchURL="http://api.napster.com/v2.2/search?";
        apiKey= "apikey=MjM3OTI0OGMtZTVjOS00OTAwLTg4MDgtYjFjOWRkNmUxNWZi"
        napsterQuery=searchURL + apiKey + "&query=" + query + "&type=album";
        console.log(napsterQuery);

        $.get(napsterQuery).then(function (result) {
            console.log(result.search.data)
        })
    })
})

