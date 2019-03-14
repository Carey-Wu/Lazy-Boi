$(document).ready(function () {


    $("#signOut").on("click", function (event) {
        event.preventDefault()

        $.get("/api/users", function (data) {
            for (var i = 0; i < data.length; i++) {
                var activeUser = data[i]
                console.log(activeUser);
                toggleActive()


                function toggleActive() {
                    if (activeUser.username === localStorage.getItem("name") && activeUser.active === true) {
                        activeUser.active = !activeUser.active;
                        updateActive(activeUser);
                    }
                    // else {
                    //     updateActive(activeUser);
                    // }
                }

                function updateActive(activeUser) {
                    $.ajax({
                        method: "PUT",
                        url: "/api/users",
                        data: activeUser
                    }).then(window.location.href = "/");
                }
            }

        })
    })
})