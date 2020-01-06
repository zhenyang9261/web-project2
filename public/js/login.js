document.addEventListener("DOMContentLoaded", function() {

    var form = document.querySelector(".login-form")

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("we got in here");

        $.post("/login", {
            email: form.elements[0].value, 
            password: form.elements[1].value
        })
        .then(response => {
            console.log("we can login now")
            if(response.message === "Auth successful") {
                localStorage.setItem("jwt", response.token);
            }

            
            location.href = "/"
           
        })
        .catch(err => {
            console.log(err);
        })
    })

});