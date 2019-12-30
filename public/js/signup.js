document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector(".signup-form")

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        var obj = {};

        for(let i = 0; i < form.elements.length - 1; i++) {
            obj[form.elements[i].name] = form.elements[i].value;
        }

        $.post("/signup", obj).then(response => {
            if(response.message === "User created") {
                location.href = "/";
            }
        })
        .catch(err => {
            console.log(err);
        });
    })

});