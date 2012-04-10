(function() {
var initChessBoard = function() {
    var jqEtude = $(this);
    var chess = jqEtude.chess({ 
        fen: jqEtude.data('fen'),
        squareSize: jqEtude.data('squareSize'),
        pgn: jqEtude.data('pgn')
    });
    jqEtude.find('.back').click(function(e) {
        chess.transitionBackward();
        e.preventDefault();
    });
    jqEtude.find('.next').click(function(e) {
        chess.transitionForward();
        e.preventDefault();
    });
    jqEtude.find('.flip').click(function(e) {
        chess.flipBoard();
        e.preventDefault();
    });
};

$(document).ready(function() {
    $('.etudes-list .etude-preview, .etude-detail').each(initChessBoard);
});
}());
