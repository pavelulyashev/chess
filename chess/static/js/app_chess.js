(function() {
var initChessBoard = function() {
    var jqEtude = $(this);
    jqEtude.chess({ 
        // moves: jqEtude.data('pgn'),
        fen: jqEtude.data('fen'),
        square_size: jqEtude.data('squareSize')
    });
};

$(document).ready(function() {
    $('.etudes-list .etude-preview, .etude-detail').each(initChessBoard);
});
}());
