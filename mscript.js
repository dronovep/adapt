$(document).ready(function () {
    var adaptivebody = new Body($('body').get(0));

    $(window).resize(function (event) {
        adaptivebody.adapt();
    });

    $(window).resize();
});

