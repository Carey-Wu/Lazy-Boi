$(document).ready(function () {


    $("#signIn").on("click", function (event) {
        event.preventDefault()

        $.get("/api/users", function (data) {
            for (var i = 0; i < data.length; i++) {
                var activeUser = data[i]
                console.log(activeUser);
                if ($("#user").val().trim() === data[i].username && $("#pass").val().trim() === data[i].password) {
                    var username = data[i].username;
                    var userEmail = data[i].email;
                    localStorage.clear();
                    localStorage.setItem("name", username);
                    localStorage.setItem("email", userEmail)
                    console.log("right");
                    toggleActive()
                }
                else {
                    console.log("wrong");
                }
            
                function toggleActive() {
                    if (activeUser.active === true){
                        updateActive(activeUser);
                    }
                    else {
                        activeUser.active = !activeUser.active;
                        updateActive(activeUser);    
                    }
                  }
    
                function updateActive(activeUser) {
                    $.ajax({
                      method: "PUT",
                      url: "/api/users",
                      data: activeUser
                    }).then(window.location.href = "/home");
                  }
            }
            
        })
    })
})