(function() {
var PositionBuilder = function(jqPosBuilder) {
    this.jq = jqPosBuilder;
    this.jqBoard = jqPosBuilder.find('.chess-board table');
    this.jq.find('.piece-block').find('.piece, .aux-piece')
                                .draggable(this.dragFromSidePanel);
    this.jq.find('.chess-board td').droppable(this.dropOptions);
    this.jqFenRegexp = this.jq.find('#id_fen_regexp');
    this.jq.find('.btn-clear-board').click($.proxy(function(e) {
        this.jqBoard.find('.piece, .aux-piece').remove();
        return false;
    }, this));
};
PositionBuilder.prototype = {
    dragFromSidePanel: {
        zIndex: 100,
        helper: 'clone'
    },
    dragFromBoard: {
        zIndex: 100,
        helper: 'original',
        stop: function(e, ui) {
            ui.helper.remove();
        }
    },
    dropOptions: {
        drop: function(e, ui) {
            var jqCell = $(this);
            var jqPiece = ui.draggable.clone()
                            .draggable(PositionBuilder.prototype.dragFromBoard)
                            .css(PositionBuilder.prototype.cssReset);
            jqCell.find('.piece, .aux-piece').remove();
            jqCell.append(jqPiece);
        }
    },
    cssReset: {
        top: 'auto',
        left: 'auto',
        zIndex: 1
    },
    submit: function() {
        if (this.jqBoard.find('.piece, .aux-piece').size() !== 0) {
            this.jqFenRegexp.val(this.buildFenRegexp());
        } else {
            this.jqFenRegexp.val('');
        }
    },
    buildFenRegexp: function() {
        return this.jqBoard.find('tr').map(function() {
            return $(this).find('td').map(function() {
                return $(this).find('.piece, .aux-piece').data('piece') || '.';
            }).toArray().join('');
        }).toArray().join('/');
    }
};

var SearchForm = {
    init: function(jqForm) {
        this.jq = jqForm;
        this.posBuilder = new PositionBuilder(jqForm.find('.position'));
        jqForm.submit($.proxy(this.submit, this));
    },
    submit: function() {
        this.posBuilder.submit();
    }
};

$(document).ready(function() {
    SearchForm.init($('.etudes-search-form'));
});
}());
