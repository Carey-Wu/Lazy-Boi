$(document).ready(function () {
    var searchURL = "";
    var query = "";
    var apiKey = ""
    var napsterQuery = ""
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
        napsterQuery=searchURL + apiKey + "&query=" + query + "&type=track";
        console.log(napsterQuery);

        $.get(napsterQuery).then(function (result) {
            console.log(result.search.data)
        })
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