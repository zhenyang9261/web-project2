$(function () {
    // Save home to favorites 
    $(".save-home-button").on("click", function (e) {
        e.stopPropagation();
        let button = $(this).children();
        button.toggleClass("font-weight-bold");
        alert("Save property test");
    });

    // Show property details in modal
    $(".home-preview-card").on("click", function () {

    });
});

