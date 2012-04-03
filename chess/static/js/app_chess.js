(function() {
var initChessBoard = function() {
    var jqEtude = $(this);
    var fen = jqEtude.data('fen');
    jqEtude.chess({ 
        fen: fen
    });
};

$(document).ready(function() {
    $('.etudes-list .etude-preview').each(initChessBoard);
});
}());
