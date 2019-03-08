$(document).ready(function(){
    var $playlist = $(".playlist")

    var name = $("#song-name")
    var artist = $("#artist-name")
    var albumArt = $("#album_url")
    var songUrl = $("#song_url")

    $(document).on("click", "#addSong", addSong);
    $(document).on("click", ".deleteSong", deleteSong);

    var songs = []

    getSongs()

    function initializeRows() {
        $playlist.empty();
        var rowsToAdd = [];
        for (var i = 0; i < songs.length; i++) {
          rowsToAdd.push(createNewRow(songs[i]));
        }
        $playlist.prepend(rowsToAdd);
      }

    function getSongs(){
        $.get("/api/songs", function(data){
            songs = data
            initializeRows()
        })
    }

    function deleteSong(event) {
        event.stopPropagation();
        var id = $(this).data("id");
        $.ajax({
          method: "DELETE",
          url: "/api/songs/" + id
        }).then(getSongs);
      }
    
      function createNewRow(song) {
        var $newInputRow = $(
          [
            "<li class='list-group-item playlist-item'>",
            "<span>",
            song.text,
            "</span>",
            "<button class='deleteSong btn btn-danger'>x</button>",
            "</li>"
          ].join("")
        );
    
        $newInputRow.find("button.deleteSong").data("id", song.id);
        $newInputRow.data("song", song);
    
        return $newInputRow;
      }

      function addSong(event) {
        event.preventDefault();

        var song = {
          name: name.val().trim(),
          artist: artist.val().trim(),
          albumArt: albumArt.val().trim(),
          songUrl: songUrl.val().trim()
        };
    
        $.post("/api/songs", song, getSongs);
      }

})