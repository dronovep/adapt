$(document).ready(function () {

    var adaptive_view = new Body();

    $(window).resize(function (event) {
        adaptive_view.adapt();
    });

    //$(window).resize();
});

