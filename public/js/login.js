$(document).ready(function () {


    $("#signIn").on("click", function (event) {
        event.preventDefault()

        $.get("/api/users", function (data) {
            for (var i = 0; i < data.length; i++) {
                if ($("#user").val().trim() === data[i].username && $("#pass").val().trim() === data[i].password) {
                    console.log("right");
                    window.location.href = "/home";
                }
                else {
                    console.log("wrong");
                }
            }
        })
    })
})