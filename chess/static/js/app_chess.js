(function() {
$(document).ready(function() {
    $('.etudes-list .etude-preview, .etude-detail').chessGame();

    window.chess = $('.etude-detail').data('chessGame');
});
}());
