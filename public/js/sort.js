/*=============================================
=            Sorting Functionality            =
=============================================*/
var sortDirection = "";
$(".dropdown-item").on("click", function () {
    sortDirection = $(this).data("sort");
    sortListDir();
});

function sortListDir() {
    var i, switching, housesList, shouldSwitch;
    switching = true;
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // start by saying: no switching is done:
        switching = false;

        housesList = $(".home-preview-card");
        // Loop through all list-items:
        for (i = 0; i < (housesList.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /* check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (sortDirection === "asc") {
                if (parseFloat(housesList[i].dataset.price.match(/\d+/g).join("")) > parseFloat(housesList[i + 1].dataset.price.match(/\d+/g).join(""))) {
                    /* if next item is alphabetically lower than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            } else if (sortDirection === "desc") {
                if (parseFloat(housesList[i].dataset.price.match(/\d+/g).join("")) < parseFloat(housesList[i + 1].dataset.price.match(/\d+/g).join(""))) {
                    /* if next item is alphabetically higher than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            }
        };
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            housesList[i].parentNode.parentNode.insertBefore(housesList[i + 1].parentNode, housesList[i].parentNode);
            switching = true;
        }
    }
}

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
