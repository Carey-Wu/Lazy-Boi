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
        napsterQuery=searchURL + apiKey + "&query=" + query + "&type=artist";
        console.log(napsterQuery);

        $.get(napsterQuery).then(function (result) {
            console.log(result.search.data)
        })
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