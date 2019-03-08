$(document).ready(function(){

    $("#signUp").on("click", function(event){
        event.preventDefault()
        var newUser = {
            username: $("#newUser").val().trim(),
            password: $("#newPass").val().trim(),
            email: $("#newEmail").val().trim()
        }

        $.post("/api/users", newUser)

        console.log("User Created" + newUser)
    })

  
})