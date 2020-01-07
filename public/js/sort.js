/*=============================================
=            Sorting Functionality            =
=============================================*/
let ascendingList = [];
let descendingList = [];
var sortDirection = "";

function sortHouseCards() {
    $(".home-preview-card").parent().sort((a, b) => {
        return a.children[0].dataset.price.match(/\d+/g).join("") - b.children[0].dataset.price.match(/\d+/g).join("")})
        .each((i, el) => ascendingList.push(el));

    $(".home-preview-card").parent().sort((a, b) => { 
        return b.children[0].dataset.price.match(/\d+/g).join("") - a.children[0].dataset.price.match(/\d+/g).join("")})
        .each((i, el) => descendingList.push(el));
}
sortHouseCards();

$(".dropdown-item").on("click", function () {
    sortDirection = $(this).data("sort");
    if (sortDirection == "asc") {
        $("#houses-cards").empty();
        for (let house of ascendingList) {
            $("#houses-cards").append(house);
        }
    }
    if (sortDirection == "desc"){
        $("#houses-cards").empty();
        for (let house of descendingList) {
            $("#houses-cards").append(house);
        }
    }
});

/*=============================================
 =   Home's Price Range Filter Functionality  =
=============================================*/
$(".range-button").on("click", function (e) {
    let minPrice = parseFloat($(".minPrice").val());
    let maxPrice = parseFloat($(".maxPrice").val());

    $("#houses-cards").children().children().each(function (i, el) {

        let housePrice = parseFloat(el.dataset.price.match(/\d+/g).join(""));

        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            if ((housePrice > maxPrice || housePrice < minPrice)) {
                el.parentNode.classList.remove("d-block");
                el.parentNode.classList.add("d-none");
                e.preventDefault();
            }
            else {
                el.parentNode.classList.remove("d-none");
                el.parentNode.classList.add("d-block");
                e.preventDefault();
            }
        } else {
            el.parentNode.classList.remove("d-none");
            el.parentNode.classList.add("d-block");
        }

    });
});

// Price range validation
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
