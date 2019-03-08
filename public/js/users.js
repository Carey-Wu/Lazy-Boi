$(document).ready(function(){

    $("#signUp").on("click", function(event){
        event.preventDefault()
        if($("#newUser").val().trim() === "" ||
        $("#newPass").val().trim() === "" ||
        $("#newEmail").val().trim() === ""
        ){
            console.log("Empty Fields")
            alert("Enter valid credentials")
        } else {
            var newUser = {
                username: $("#newUser").val().trim(),
                password: $("#newPass").val().trim(),
                email: $("#newEmail").val().trim()
            }

            $.post("/api/users", newUser)

            console.log("User Created" + JSON.stringify(newUser))
            window.location.href = "/home";
        }
    })

  
})