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

                var img = $("<img></img>")
                var album_id = trackResults[i].links.albums.ids[0]
                var imgSrc = "https://direct.napster.com/imageserver/v2/albums/" + album_id + "/images/200x200.jpg"
                img.attr("src", imgSrc)
                console.log("imgSrc: " + imgSrc)

                var title = $("<h3></h3>")
                title.attr("class", "card-title")

                var artist = $("<h4></h4>")
                var album = $("<h4></h4>")

                title.text(trackResults[i].name)
                artist.text("Artist: " + trackResults[i].artistName)
                album.text("Album: " + trackResults[i].albumName)

                var playButton = $("<button>Play Song!</button>")
                var addButton = $("<button>Add to Playlist!</button>")
                addButton.attr("class", "btn btn-success addBtn")
                addButton.attr("track", trackResults[i].name)
                addButton.attr("artist", trackResults[i].artistName)
                addButton.attr("album", trackResults[i].albumName)

                playButton.attr("class", "btn btn-success playBtn")
                var ytRef = (trackResults[i].name + " by " + trackResults[i].artistName)
                playButton.attr("data-ref", ytRef)


                img.appendTo(cardBody)
                title.appendTo(cardBody)
                artist.appendTo(cardBody)
                album.appendTo(cardBody)

                playButton.appendTo(cardBody)
                addButton.appendTo(cardBody)


                cardBody.appendTo(infoDiv)
                
                infoDiv.appendTo($("#trackResults"))
            }
            $(".playBtn").on("click", function(event){
                event.preventDefault()
                var ytRef = $(this).data("ref")
                console.log("playButton")
                console.log(ytRef)
                ytSearch(ytRef)
            })
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
                var ytRef = (tracks[i].name + " by " + tracks[i].artistName)

                playButton.attr("class", "btn btn-success playBtn")
                playButton.attr("data-ref", ytRef)
                addButton.attr("class", "btn btn-success")

                title.appendTo(trackBody)
                album.appendTo(trackBody)

                playButton.appendTo(trackBody)
                addButton.appendTo(trackBody)

                trackBody.appendTo(trackDiv)
                trackDiv.appendTo($("#artistResults"))

                }
                $(".playBtn").on("click", function(event){
                    event.preventDefault()
                    var ytRef = $(this).data("ref")
                    console.log("playButton")
                    console.log(ytRef)
                    ytSearch(ytRef)
                })
            })

//=============================tracks card end=====================================================
            infoDiv.appendTo($("#artistResults"))
            
        })
        $("#mu-music-results").show()
        $("#artistResults").show()
    })

    $("#searchAlbum").on("click", function (event) {
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
        napsterQuery=searchURL + apiKey + "&query=" + query + "&type=album&per_type_limit=5";
        console.log(napsterQuery);

        $.get(napsterQuery).then(function (result) {
            console.log(result.search.data)

            var albumResults = result.search.data.albums
            $("#albumResults").empty()

            for(var i=0; i < albumResults.length; i ++){

                console.log(albumResults[i])
                var album_id = albumResults[i].id

                var infoDiv = $("<div></div>")
                infoDiv.attr("class", "card col-md-12")

                var cardBody = $("<div></div>")
                cardBody.attr("class", "card-body")

                var albumTracks = $("<div></div>")
                albumTracks.attr("class", "albumTracks")
                albumTracks.attr("data-id", i)

                var title = $("<h3></h3>")
                title.attr("class", "card-title")

                var artist = $("<h4></h4>")

                title.text(albumResults[i].name)
                artist.text("Artist: " + albumResults[i].artistName)

                var img = $("<img></img>")
                var imgSrc = "https://direct.napster.com/imageserver/v2/albums/" + album_id + "/images/300x300.png"
                img.attr("src", imgSrc)
                console.log("imgSrc: " + imgSrc)

//=============================view tracks functionality========================================
                var viewTracks = $("<button>See Tracks</button>")
                viewTracks.attr("class", "btn btn-success viewTracks")

                var tracksRef = albumResults[i].links.tracks.href + "?" + apiKey
                viewTracks.attr("data-ref", tracksRef )
                viewTracks.attr("id", i)


//==============================================================================================
                img.appendTo(cardBody)
                title.appendTo(cardBody)
                artist.appendTo(cardBody)

                viewTracks.appendTo(cardBody)
                albumTracks.appendTo(cardBody)

                cardBody.appendTo(infoDiv)
                
                infoDiv.appendTo($("#albumResults"))
            }
            $(".viewTracks").on("click", function(event){
                event.preventDefault()
                console.log("view Tracks")
                $("#albumTracks").empty()
    
                var tracksRef = $(this).data("ref")
                var id = $(this).data("id")
                console.log("tracksRef: " + tracksRef)

                

    
                $.get(tracksRef).then(function(results){
                    var trackResults = results.tracks
                    var tracksDiv = $("#albumTracks")
                    var album = $("<h2></h2>")
                    var artist = $("<h4></h4>")
                    var album_id = results.tracks[0].links.albums.ids[0]
                    var imgSrc = "https://direct.napster.com/imageserver/v2/albums/" + album_id + "/images/300x300.png"

                    $("#modalImg").attr("src", imgSrc)
                    album.text(trackResults[0].albumName)
                    artist.text("by " + trackResults[0].artistName)

                    album.appendTo(tracksDiv)
                    artist.appendTo(tracksDiv)

                    for(var i =0; i< trackResults.length; i ++){
                        console.log(trackResults[i].name)

                        var albumTracks = $("<div></div>")
                        var playButton = $("<button>Play Song!</button>")
                        var addButton = $("<button>Add to Playlist!</button>")
                        var ytRef = (trackResults[i].name + " by " + trackResults[i].artistName)
        
                        playButton.attr("class", "btn btn-success playBtn")
                        playButton.attr("data-ref", ytRef)
                        addButton.attr("class", "btn btn-success")
                
                        var p = $("<p></p>")

                        p.text((i+1) + ".) " + trackResults[i].name)
                        p.appendTo(albumTracks)
                        playButton.appendTo(albumTracks)
                        addButton.appendTo(albumTracks)
                       
                        albumTracks.appendTo(tracksDiv)
                    }
                    $(".playBtn").on("click", function(event){
                        event.preventDefault()
                        var ytRef = $(this).data("ref")
                        console.log("playButton")
                        console.log(ytRef)
                        ytSearch(ytRef)
                    })
                })
                $("#albumModal").modal("show")
            })
        })

        $("#mu-music-results").show()
        $("#albumResults").show()
    })

function ytSearch(query){
    var userSearch = query
    var root = "https://www.youtube.com/embed/"

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            q: userSearch,
            type: "video",
            videoEmbeddable: true,
            key: "AIzaSyCfYX18CUnQSumetnfx59uPgQN3400sTG8"
        }, 
            function(data){
                $("#youtubeResults").empty()
                for (var i = 0; i < 1; i++) {
                    var video = data.items[i];
                    var videoId = video.id.videoId;
                    var url = root + videoId;
                    console.log(url, "-------------------------")
                    $("#youtubeResults").append(`<iframe width="400" height="315" src=${url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)

                }
             }
    )
    console.log(userSearch)
    $("#youtubeModal").modal("show")
    $("#albumModal").modal("hide")
}



})//document ready

