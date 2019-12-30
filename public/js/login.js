document.addEventListener("DOMContentLoaded", function() {

    var form = document.querySelector(".login-form")

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        $.post("/login", {
            email: form.elements[0].value, 
            password: form.elements[1].value
        })
        .then(response => {
            if(response.message === "Auth successful") {
                localStorage.setItem("jwt", JSON.stringify(response.token));
                localStorage.setItem("name", response.name);
            }

            
            location.href = "/"
           
        })
        .catch(err => {
            console.log(err);
        })
    })

});