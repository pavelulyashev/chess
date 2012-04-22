(function() {
$(document).ready(function() {
    $('.etudes-list .etude-preview, .etude-detail').chessGame();
    $('.etude-detail').on('click', '.spoiler-reveal', function(e) {
        e.preventDefault();
        $(this).closest('.etude-detail').addClass('solution-opened');
    }).on('click', '.spoiler-hide', function(e) {
        e.preventDefault();
        $(this).closest('.etude-detail').removeClass('solution-opened');
    });

    window.chess = $('.etude-detail').data('chess');
});
}());
