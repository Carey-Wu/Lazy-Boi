$(document).ready(function(){

    $("#signUp").on("click", function(event){
        event.preventDefault()
        var newUser = {
            username: $("#user").val().trim,
            password: $("#pass").val().trim,
            email: $("#email").val().trim
        }

        $.post("/api/users", newUser).then(getUsers)

        console.log("User Created" + newUser)
    })
})