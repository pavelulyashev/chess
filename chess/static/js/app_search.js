(function() {
var PositionBuilder = function(jqPosBuilder) {
    this.jq = jqPosBuilder;
    this.jqBoard = jqPosBuilder.find('.chess-board table');
    this.jq.find('.piece-block').find('.piece, .aux-piece')
                                .draggable(this.dragFromSidePanel);
    this.jq.find('.chess-board td').droppable(this.dropOptions)
           .find('.piece, .aux-piece').draggable(this.dragFromBoard);
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

var PiecesCounter = function(jqPiecesCounter) {
    this.jq = jqPiecesCounter;
    this.jqWhiteRe = this.jq.find('#id_white_pieces_regexp');
    this.jqBlackRe = this.jq.find('#id_black_pieces_regexp');
};
PiecesCounter.prototype = {
    submit: function() {
        var whiteInputs = this.jq.find('.white-counts .pieces input');
        var blackInputs = this.jq.find('.black-counts .pieces input');
        this.jqWhiteRe.val(this.joinInputs(whiteInputs));
        this.jqBlackRe.val(this.joinInputs(blackInputs));
    },
    joinInputs: function(jqInputs) {
        var values = jqInputs.map(function() {
            var value = $(this).val();
            if (!value.match(/^\d(-\d)?$/)) {
                value = '';
            }
            return value;
        }).toArray();

        return values.join('') === '1' ? '' : values.join(',');
    }
};

var SearchForm = {
    init: function(jqForm) {
        this.jq = jqForm;
        this.piecesCounter = new PiecesCounter(jqForm.find('.pieces-count'));
        this.posBuilder = new PositionBuilder(jqForm.find('.position'));
        jqForm.submit($.proxy(this.submit, this));

        this.bindEvents();
    },
    bindEvents: function() {
        var jq = this.jq;
        jq.find('.btn-reset-fieldset').click(function() {
            var fieldset = $(this).closest('fieldset');
            fieldset.find('input:text:not([disabled])').val('');
            fieldset.find(':checkbox').each(function() {
                var self = $(this);
                if (self.prop('checked')) {
                    fieldset.find('label[for=' + self.attr('id') + ']').click();
                    self.prop('checked', false);
                }
            });
            return false;
        });

        jq.find('.btn-toggle-form').click(function() {
            jq.toggleClass('hide-form');
            return false;
        });
    },
    submit: function() {
        this.posBuilder.submit();
        this.piecesCounter.submit();
    }
};

$(document).ready(function() {
    SearchForm.init($('.etudes-search-form'));
});
}());
