$(document).ready(function () {
  var $playlist = $(".playlist")

  var name = $("#song-name")
  var artist = $("#artist-name")
  var albumArt = $("#album_url")
  var songUrl = $("#song_url")

  $(document).on("click", ".addBtn", function (event) {
    event.preventDefault();
    var artist = $(this).attr("artist");
    var name = $(this).attr("track");
    var album = $(this).attr("album");
    console.log(name);
    console.log(artist);
    console.log(album);

    $.get("/api/users", function (data) {

      for (var i = 0; i < data.length; i++) {
        var song = {
          artist: artist,
          song_title: name,
          album: album,
          UserId: data[i].id
        };
        if (data[i].active === true && data[i].username === localStorage.getItem("name")) {
          $.post("/api/songs", song)
        }
        else {
          console.log("User " + data[i].username + " not Signed In")
        }
      }
    })
    window.location.reload();
  });


  $(document).on("click", ".deleteSong", deleteSong);

  var songs = []

  // getSongs()

  function initializeRows() {
    $playlist.empty();
    var rowsToAdd = [];
    for (var i = 0; i < songs.length; i++) {
      rowsToAdd.push(createNewRow(songs[i]));
    }
    $playlist.prepend(rowsToAdd);
  }

  function getSongs() {
    $.get("/api/songs", function (data) {
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
  $.get("/api/users", function (data) {

    for (var i = 0; i < data.length; i++) {
     
      if (data[i].active === true && data[i].username === localStorage.getItem("name")) {
      
        var currentUser = data[i].id
        console.log(currentUser)
        $.get("api/songs", function (table) {
          for (var i = 0; i < table.length; i++) {
            console.log(table[i].UserId)
            if (table[i].UserId===currentUser){
              var name=table[i].song_title
              var singer=table[i].artist
              var record=table[i].album
              var tbody=$("<tbody><tr><td>"+name+"</td><td>"+singer+"</td><td>"+record+"</td></tr>")
              tbody.appendTo($(".table"))
              
            }
          }
        })
      }
    }
  })
})
