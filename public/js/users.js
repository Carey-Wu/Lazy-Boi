$(document).ready(function(){

    $("#signUp").on("click", function(event){
        event.preventDefault()
        console.log("signUp button pressed")
        if($("#newUser").val().trim() === "" ||
        $("#newPass").val().trim() === "" ||
        $("#newEmail").val().trim() === ""
        ){
            console.log("Empty Fields")
            alert("Enter valid credentials")
        } 
        else if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.exec($("#newEmail").val().trim()) === null){
            console.log("Invalid Email")
            alert("Enter valid email")
        }
        else if ($("#newPass").val().trim() != $("#newPass2").val().trim()){
            console.log("Password Match Fail")
            alert("Passwords Do Not Match! Please Try Again.")
        }
        else {
            var newUser = {
                username: $("#newUser").val().trim(),
                password: $("#newPass").val().trim(),
                email: $("#newEmail").val().trim(),
                active: true
            }

            $.post("/api/users", newUser)

            console.log("User Created" + JSON.stringify(newUser))
            $("#tab-1").click();
            alert("New User Created. Please Login")        
        }
    })
})
