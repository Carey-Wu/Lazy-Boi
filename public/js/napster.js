var searchURL="http://api.napster.com/v2.2/search?";
var searchType= $(".searchType").val().trim();
var query= $(".query").val().trim();
var apiKey= "MjM3OTI0OGMtZTVjOS00OTAwLTg4MDgtYjFjOWRkNmUxNWZi"
var napsterQuery= searchURL+ "apikey=" + apiKey + "query=" + query + "type=" + searchType

$.ajax({
    method:"GET",
    URL: napsterQuery
}).then(function(result){
    console.log(result)
})
