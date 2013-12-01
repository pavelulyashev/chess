(function() {
var initChessGame = $.initChessGame = function() {
    var self = $(this);
    var size = parseInt(self.find('.chess-board').width(), 10) / 8;
    self.data('cellSize', size).chessGame();
};

$(document).ready(function() {
    $('.etudes-list .etude-preview, .etude-detail').each(initChessGame);

    $('.etude-detail').on('click', '.spoiler-reveal', function(e) {
        e.preventDefault();
        $(this).closest('.etude-detail').addClass('solution-opened');
    }).on('click', '.spoiler-hide', function(e) {
        e.preventDefault();
        $(this).closest('.etude-detail').removeClass('solution-opened');
    });

    window.chess = $('.etude-detail').data('chess');

    if ($.fn.simpleInfiniteScroll) {
        var jqScrollContainer = $('.etudes-by-composer-list');
        var jqEtudesList = jqScrollContainer.find('.etudes-list');
        jqScrollContainer.simpleInfiniteScroll({
            totalPagesNumber: jqScrollContainer.data('totalPages'),
            threshold: 100,
            url: window.location.href,
            method: 'get',
            newPageLoaded: function(e, data) {
                var etudes = $(data);
                jqEtudesList.append(etudes);
                etudes.find('.etude-preview').each(initChessGame);
                return false;
            }
        });
    }

    $('.etude-cell .open-as-image').on('click', function(e) {
        e.preventDefault();

        var $board = $(this).next().find('.chess-board');
        $board.html2canvas({
            onrendered: function(canvas) {
                var url = canvas.toDataURL();
                window.open(url, 'asd', 'height=208,width=208,location=0');
            }
        });
    })
});
}());
