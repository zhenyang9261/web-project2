var form = document.querySelector(".login-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    $.post("/users/login", {
        email: form.elements[0].value, 
        password: form.elements[1].value
    })
    .then(response => {
        if(response.message === "Auth successful") {
            localStorage.setItem("jwt", JSON.stringify(response.token));
        }
        console.log(response.token);

        $.ajax({
            type: "GET", 
            url: "/users/chat",
            headers: {
                "token": response.token
            }
        });
    })
    .catch(err => {
        console.log(err);
    })
})