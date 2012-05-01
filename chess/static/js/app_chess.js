(function() {
var initChessGame = function() {
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

    var jqScrollContainer = $('.etudes-list-without-scroll');
    var url = jqScrollContainer.data('paginationUrl');
    if (url) {
        var jqEtudesList = jqScrollContainer.find('.etudes-list');
        jqScrollContainer.simpleInfiniteScroll({
            totalPagesNumber: jqScrollContainer.data('totalPages'),
            threshold: 100,
            url: url,
            method: 'get',
            newPageLoaded: function(e, data) {
                var etudes = $(data);
                jqEtudesList.append(etudes);
                etudes.find('.etude-preview').each(initChessGame);
            }
        });
    }
});
}());
