$(document).ready(function(){


    $("#signIn").on("click", function(event){
        event.preventDefault()
        for (var i=0; i < db.User.length; i++) {
            if ($("#user").val().trim() === db.User.username[i] && $("#pass").val().trim() === db.User.password[i]){
                console.log("right");
                res.redirect("/home");
            }
           else {
               console.log("wrong");
           }
    
        }
        
        // $.post("/api/users", newUser)

        // console.log("User Created" + newUser)
    })

  
})