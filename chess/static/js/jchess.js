/*
 * jChess 0.1.0 - Chess Library Built From jQuery
 *
 * Copyright (c) 2008 Ben Marini
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */



/*
 * XXX REQUIRED:
 * Array.prototype.forEach
 * Array.prototype.map
 * Array.prototype.filter
 * Array.prototype.reverse
 *
 * Object.keys
 *
 * String.prototype.indexOf
 */

/*
 * Symbols meanings
 *
 * player
 *   0 - white
 *   1 - black
 */

/*
 * Utils functions
 * Don't use side namespaces (such as jQuery) inside logic implementation
 * (classes Move, MoveNode, ChessNotation, ChessGame)
 *
 * use namespace utils for this purposes
 */
var utils = {
    extend: $.extend,
    trim: $.trim,
    chess: {
        pieces: {
            vectors: {
                R: [
                    { x: 0, y: 1, limit: 7 },
                    { x: 1, y: 0, limit: 7 }
                ],
                N: [
                    { x: 1, y: 2, limit: 1 },
                    { x: 2, y: 1, limit: 1 },
                    { x: 2, y: -1, limit: 1 },
                    { x: 1, y: -2, limit: 1 }
                ],
                B: [
                    { x: 1, y: 1, limit: 7 },
                    { x: 1, y: -1, limit: 7 }
                ],
                Q: [
                    { x: 0, y: 1, limit: 7 },
                    { x: 1, y: 0, limit: 7 },
                    { x: 1, y: 1, limit: 7 },
                    { x: 1, y: -1, limit: 7 }
                ],
                K: [
                    { x: 0, y: 1, limit: 1 },
                    { x: 1, y: 0, limit: 1 },
                    { x: 1, y: 1, limit: 1 },
                    { x: 1, y: -1, limit: 1 }
                ]
            },
            getPossibleSourceCells: function(move) {
                var cells = [], vectors, piece = move.piece;
                var file = move.dest.file, rank = move.dest.rank;
                if (piece === 'P') {
                    if (move.capturing) {
                        cells = [{ file: file - 1, rank: rank - 1 },
                                 { file: file + 1, rank: rank - 1 }];
                    }
                    cells.push({ file: file, rank: rank - 1 });
                    if (file === 3) {
                        cells.push({ file: file, rank: rank - 2 });
                    }
                } else if (piece === 'p') {
                    if (move.capturing) {
                        cells = [{ file: file - 1, rank: rank + 1 },
                                 { file: file + 1, rank: rank + 1 }];
                    }
                    cells.push({ file: file, rank: rank + 1 });
                    if (file === 4) {
                        cells.push({ file: file, rank: rank + 2 });
                    }
                } else {
                    vectors = this.vectors[piece.toUpperCase()];
                    vectors.forEach(function(vect) {
                        var i;
                        for (i = -vect.limit; i <= vect.limit; i++) {
                            if (i === 0) { continue; }

                            cells.push({ file: file + vect.x * i,
                                         rank: rank + vect.y * i });
                        }
                    });
                }
                return cells.filter(function(cell) {
                    return cell.file >= 0 && cell.file <= 7 &&
                           cell.rank >= 0 && cell.rank <= 7;
                });
            },
            unicode: {
                K: '\u2654',
                Q: '\u2655',
                R: '\u2656',
                B: '\u2657',
                N: '\u2658',
                P: '\u2659',
                k: '\u265A',
                q: '\u265B',
                r: '\u265C',
                b: '\u265D',
                n: '\u265E',
                p: '\u265F'
            },
            replaceByUnicode: function(str) {
                var dict = this.unicode;
                return str.replace(/[bknqrpBKNQRP]/g, function(piece) {
                    return dict[piece];
                });
            }
        },
        /*
         * replace numeric annotation glyphs
         * see http://en.wikipedia.org/wiki/Numeric_Annotation_Glyphs
         */
        nag: {
            dict: {
                1: '!',
                2: '?',
                3: '‼',
                4: '⁇',
                5: '⁉',
                6: '⁈',
                7: '□' /*,
                Commented glyphs are position-related, not move-related
                10: '=',
                13: '∞',
                16: '±',
                17: '∓',
                18: '+-',
                19: '-+',
                22: '⨀',
                23: '⨀',
                36: '→',
                37: '→',
                40: '↑',
                41: '↑',
                132: '⇆',
                133: '⇆',
                140: '∆',
                142: '⌓',
                145: 'RR',
                146: 'N',
                239: '⇔',
                240: '⇗'
                        */
            },
            replace: function(pgn) {
                var nag = this;
                return pgn.replace(/ \$(\d+)/g, function(str, number) {
                    return nag.dict[number] || '';
                });
            }
        },
        coord: {
            getCellPosition: function(cellSize, cell, isFlippedBoard) {
                var x = cell.file * cellSize, y = cell.rank * cellSize;
                return isFlippedBoard ? { top: y, right: x }
                                      : { bottom: y, left: x };
            }
        }
    }
};



var Move = function(token, player) {
    this.source = token;
    this.parseToken(token);
    this.reduceFileAndRankToCoordinates();
    this.reducePieceByPlayer(player);
};
Move.prototype = {
    constructor: Move,
    toString: function() {
        return this.source;
    },
    patterns: {
        castling: /^O-O(-O)?/g,
        generalMove: /^([BKNQR]?)([a-h]?)([1-8]?)(x?)([a-h])([1-8])(\=?)([BNQR]?)/,
        endSymbols: /([+#]?)([\W]*)$/
    },
    parseToken: function(token) {
        if (token.match(this.patterns.castling)) {
            this.castling = true;
            this.castlingSide = RegExp.$1 ? 'queen' : 'king';     // '-O'
        } else if (token.match(this.patterns.generalMove)) {
            this.piece = RegExp.$1 || 'P';                        // [BKNQR]?
            this.src = {
                file: RegExp.$2,                                  // [a-h]?
                rank: RegExp.$3                                   // [1-8]?
            };
            this.capturing = Boolean(RegExp.$4);                  // x?
            this.dest = {
                file: RegExp.$5,                                  // [a-h]
                rank: RegExp.$6                                   // [1-8]
            };
            if (RegExp.$7 && RegExp.$8 && this.piece === 'P') {   // \=?
                this.pawnPromotion = RegExp.$8;                   // [BNQR]
            }
        } else {
            console.assert(false, 'Invalid move format');
        }

        if (token.match(this.patterns.endSymbols)) {
            if (RegExp.$1 === '+') {
                this.check = true;
            } else if (RegExp.$1 === '#') {
                this.checkmate = true;
            }
            if (RegExp.$2) {
                this.nag = RegExp.$2;
            }
        }
    },
    reduceFileAndRankToCoordinates: function() {
        var files = 'abcdefgh';
        this.dest.file = files.indexOf(this.dest.file);
        this.dest.rank = this.dest.rank - 1;
        this.src.file = this.src.file ? files.indexOf(this.src.file) : null;
        this.src.rank = this.src.rank ? this.src.rank - 1 : null;
    },
    reducePieceByPlayer: function(player) {
        if (player) {
            this.piece = this.piece.toLowerCase();
            if (this.pawnPromotion) {
                this.pawnPromotion = this.pawnPromotion.toLowerCase();
            }
        }
    },
    addAnnotation: function(annotation) {
        this.annotation = annotation;
    }
};

var MoveNode = function(move, number, player) {
    this.move = move;
    this.number = number;
    this.player = player;
    this.nesting = 0;
};
MoveNode.prototype = {
    constructor: MoveNode,
    toString: function(toHtml) {
        var tokens = [], moveNode = this;
        var variationToString = function(variation) {
            tokens.push(['(', variation.toString(toHtml), ')'].join(''));
        };
        do {
            if (moveNode.player === 0 || !tokens.length ||
                moveNode.prev.variations) {
                tokens.push(moveNode.getNumberToken());
            }
            tokens.push(toHtml ? moveNode.html() : moveNode.move);
            if (moveNode.variations) {
                moveNode.variations.forEach(variationToString);
            }
        } while ((moveNode = moveNode.next));
        return tokens.join(toHtml ? '' : ' ');
    },
    html: function() {
        var classes = ['move', this.player ? 'black' : 'white',
                       'nesting-' + this.nesting].join(' ');
        return ['<span class="', classes, '">', this.move, '</span>'].join('');
    },
    getNumberToken: function() {
        return this.number + (this.player === 0 ? '.' : '...');
    },
    addNext: function(moveNode) {
        var numbersDiff = moveNode.number - this.number;
        console.assert(this.player !== moveNode.player,
                       'Consequtive moves for one player', this, moveNode);
        console.assert(this.player === 0 && numbersDiff === 0 ||
                       this.player === 1 && numbersDiff === 1,
                       'Invalid numbers for consequtive moves', this, moveNode);
        this.next = moveNode;
        moveNode.prev = this;
    },
    addVariation: function(moveNode) {
        if (this.variations === undefined) {
            this.variations = [moveNode];
        } else {
            this.variations.push(moveNode);
        }
        moveNode.prev = this;
        moveNode.nesting = this.nesting + 1;
    }
};


var ChessNotation = function(pgn) {
    this.source = pgn;
    this.parsePgn(this.preparePgn(pgn));
};
ChessNotation.prototype = {
    constructor: ChessNotation,
    toString: function() {
        return [this.tree.toString(), this.result].join(' ');
    },
    html: function() {
        var result = '<span class="result">' + this.result + '</span>';
        return [this.tree.toString(true), result].join(' ');
    },
    patterns: {
        split: /(\{[^}]*\})|[()]|([^\s()]+)/g,
        number: /^(\d+)\.(\.\.)?$/,
        result: /^1\-0|1\/2\-1\/2|0\-1|\*$/,
        annotation: /^\{([^}]*)\}$/
    },
    preparePgn: function(pgn) {
        return utils.chess.nag.replace(pgn);
    },
    parsePgn: function(pgn) {
        var tokens = pgn.match(this.patterns.split);
        console.assert(tokens !== null, 'Invalid notation');

        this.createVariantsTree(tokens);
    },
    createVariantsTree: function(tokens) {
        var i = 0, token, roots = [];
        var rootNode, leafNode, moveNum, player, moveNode, newBranch = true;

        while ((token = tokens[i++])) {
            if (token.match(this.patterns.number)) {
                moveNum = Number(RegExp.$1);
                player = Number(Boolean(RegExp.$2));
            } else if (token === '(') {
                newBranch = true;
            } else if (token === ')') {
                newBranch = false;
                leafNode = rootNode.prev;
                roots.pop();
                rootNode = roots[roots.length - 1];
            } else if (token.match(this.patterns.result)) {
                this.result = RegExp.$_;
            } else if (token.match(this.patterns.annotation)) {
                leafNode.move.addAnnotation(RegExp.$1);
            } else {
                moveNode = new MoveNode(new Move(token, player),
                                        moveNum, player);

                if (newBranch) {
                    if (leafNode) {
                        leafNode.addVariation(moveNode);
                    } else {
                        this.tree = leafNode = moveNode;
                    }
                    roots.push(leafNode = rootNode = moveNode);
                    newBranch = false;
                } else {
                    leafNode.addNext(moveNode);
                    leafNode = moveNode;
                }
                player = player ^ 1;
            }
        }
        // TODO
        // this.movesCount
    }
};


var ChessPiece = function(piece, file, rank, id) {
    this.piece = piece;
    this.color = piece.match(/[bknqrp]/) ? 'b' : 'w';
    this.id = id;
    this.file = file;
    this.rank = rank;
};
ChessPiece.prototype = {
    constructor: ChessPiece,
    toString: function() {
        return this.piece;
    },
    getClass: function() {
        return this.color + this.piece;
    }
};

var ChessBoard = function(piecePlacement) {
    this.init(piecePlacement);
};
ChessBoard.prototype = {
    constructor: ChessBoard,
    init: function(piecePlacement) {
        var board = [], countPieces = 0;
        var pieces = {};
        piecePlacement = this._numbersToDashes(piecePlacement).split('/');
        piecePlacement.reverse().forEach(function(row, r) {
            row = board[r] = row.split('');
            row.forEach(function(piece, f) {
                if (piece !== '-') {
                    row[f] = new ChessPiece(piece, f, r, ++countPieces);
                    (pieces[piece] = pieces[piece] || []).push(row[f]);
                } else {
                    row[f] = null;
                }
            });
        });
        this._board = board;
        this._pieces = pieces;
        this._countPieces = countPieces;
    },
    toString: function() {
        var board = this._board.slice().reverse().map(function(row) {
            return row.map(function(piece) { return piece || '-'; }).join(' ');
        }).join('\n');
        return utils.chess.pieces.replaceByUnicode(board);
    },
    getPieces: function() {
        var pieces = [];
        Object.keys(this._pieces).forEach(function(key) {
            pieces = pieces.concat(this[key]);
        }, this._pieces);
        return pieces;
    },
    getSourcePiece: function(move) {
        var cells = utils.chess.pieces.getPossibleSourceCells(move);
        var cell = cells.filter(function(cell) {
            var chessPiece = this.getPiece(cell);
            return chessPiece && chessPiece.piece === move.piece &&
                   (!move.src.rank || move.src.rank === cell.rank) &&
                   (!move.src.file || move.src.file === cell.file);
        }, this)[0];
        return cell && this._board[cell.rank][cell.file];
    },
    runMove: function(moveTransitions) {
        moveTransitions.forEach(function(transition) {
            var piece = transition.piece, destCell = transition.destCell;
            if (transition.add) {
                this._addPiece(piece);
            } else if (transition.move) {
                this._movePiece(piece, destCell);
            }
        }, this);
    },
    getPiece: function(cell) {
        return this._board[cell.rank][cell.file];
    },
    addPiece: function(piece, cell) {
        piece = new ChessPiece(piece, cell.file, cell.rank, ++this._countPieces);
        return this._board[piece.rank][piece.file] = piece;
    },
    _movePiece: function(piece, destCell) {
        this._board[destCell.rank][destCell.file] = piece;
        this._board[piece.rank][piece.file] = null;
        piece.rank = destCell.rank;
        piece.file = destCell.file;
    },
    _numbersToDashes: function(piecePlacement) {
        return piecePlacement.replace(/\d/g, function(num) {
            return '--------'.slice(0, num);
        });
    }
};


var ChessGame = function(options) {
    this.options = utils.extend({}, this.defaults, options);
    this.parseFen(this.options.fen);
    if (this.options.pgn) {
        this.parsePgn(this.options.pgn);
        this.currentMove = this.notation.tree;
    }
    console.log(this.board + '');
};
ChessGame.prototype = {
    constructor: ChessGame,
    defaults: {
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    },
    patterns: {
        header: /\[(\w+) (["'])([^\]]*)\2\]/g,
        notation: /\d+\.(\.\.)? [BNKQROa-h].*(1\-0|1\/2\-1\/2|0\-1|\*)/
    },
    parseFen: function(fen) {
        console.assert(fen, 'Given FEN is empty', fen);

        var fenParts = utils.trim(fen).split(/\s+/);

        this.board = new ChessBoard(fenParts[0]);
        this.game = {
            activeColor: fenParts[1],
            castlingAvailability: fenParts[2],
            enPassantTargetSquare: fenParts[3],
            halfmoveClock: Number(fenParts[4]),
            fullmoveNumber: Number(fenParts[5])
        };
    },
    validateFen: function(fen) {
        return true;
    },
    parsePgn: function(pgn) {
        if (pgn.match(this.patterns.notation)) {
            this.notation = new ChessNotation(RegExp.$_);
        }
        this.parsePgnHeaders(pgn);
    },
    parsePgnHeaders: function(pgn) {
        this.headers = {};
        while (this.patterns.header.exec(pgn) !== null) {
            this.headers[RegExp.$1] = RegExp.$3;
        }
    },
    isMovePossible: function(move) {
        // if (move.validated === true) {
            return true;
        // }

        // return this.getMoveTransitions(move);
    },
    getForwardTransitions: function(move) {
        var piece = this.board.getSourcePiece(move);
        var transitions = [{
            move: true,
            piece: piece,
            destCell: move.dest
        }];
        if (move.capturing) {
            transitions.push({
                remove: true,
                piece: this.board.getPiece(move.dest)
            });
        }
        if (move.pawnPromotion) {
            transitions.push({
                add: true,
                piece: this.board.addPiece(move.pawnPromotion, move.dest)
            });
        }
        if (move.castling) {
            // TODO
        }
        return transitions;
    },
    getBackwardTransitions: function(move) {
        var transitions = [{
            move: true,
            piece: piece,
            destCell: move.dest
        }];
    },
    /*
     * moveForward (moveBackward) returns
     *     move object if forward (backward) move exists in notation
     *     otherwise returns false
     */
    moveForward: function() {
        var moveNode = this.currentMove, transitions;
        if (moveNode && this.isMovePossible(moveNode.move)) {
            transitions = this.getForwardTransitions(moveNode.move);
            this.currentMove = moveNode.next;
            this.board.runMove(transitions);
            console.log(this.board + '', moveNode.move + '');
            return transitions;
        }
    },
    moveBackward: function() {
        var moveNode = this.currentMove, transitions;
        if (moveNode && this.isMovePossible(moveNode.move)) {
            transitions = this.getBackwardTransitions(moveNode.move);
            this.currentMove = moveNode.prev;
            this.board.runMove(transitions);
            console.log(this.board + '', moveNode.prev + '');
            return transitions;
        }
    }
};


var ChessGameView = function(jqWrapper, options) {
    var game = this.chessGame = new ChessGame(options);
    this._jqWrapper = jqWrapper;
    this.options = utils.extend({}, this.defaults, options);
    this._initBoard();
    this._initPieces(game.board.getPieces());
    this._initEvents();
};
ChessGameView.prototype = {
    constructor: ChessGameView,
    defaults: {
        cellSize: 44,
        showAnnotations: false,
        boardClass: 'chess-board',
        pieceClass: 'piece',
        flippedBoard: false,
        links: {
            nextMove: '.next-move',
            prevMove: '.prev-move',
            firstMove: '.first-move',
            lastMove: '.last-move',
            flipBoard: '.flip-board'
        },
        notation: '.chess-notation'
    },
    _initBoard: function() {
        var boardClass = this.options.boardClass;
        var boardSelector = '.' + boardClass, jqBoard;

        if (this._jqWrapper.is(boardSelector)) {
            jqBoard = this._jqWrapper;
        } else {
            jqBoard = this._jqWrapper.find(boardSelector);
            jqBoard = jqBoard.size() ? jqBoard :
                $('<div/>').addClass(boardClass).appendTo(this._jqWrapper);
        }
        this._jqBoard = jqBoard;
    },
    _initPieces: function(pieces) {
        pieces.forEach(this._addPiece, this);
    },
    _addPiece: function(piece, animate) {
        var hiddenPiece = this._getPiece(piece.id);
        if (hiddenPiece.size()) {
            if (animate) { piece.fadeIn('fast'); } else { piece.show(); }
        }
        var opt = this.options, position = utils.chess.coord.getCellPosition;
        var classes = [opt.pieceClass, piece.getClass()].join(' ');
        var jqPiece = $('<div/>').addClass(classes);

        jqPiece.css(position(opt.cellSize, piece, opt.flippedBoard));
        jqPiece.attr('data-id', piece.id).appendTo(this._jqBoard);
    },
    _getPiece: function(id) {
        return this._jqBoard.find(['.piece[data-id=', id, ']'].join(''));
    },
    _removePiece: function(piece, animate) {
        piece = this._getPiece(piece.id);
        if (animate) { piece.fadeOut('fast'); } else { piece.hide(); }
    },
    _movePiece: function(piece, destCell, animate) {
        var opt = this.options, position = utils.chess.coord.getCellPosition;
        var newPos = position(opt.cellSize, destCell, opt.flippedBoard);
        var jqPiece = this._getPiece(piece.id);
        return animate ? jqPiece.animate(newPos, 'fast') : jqPiece.css(newPos);
    },
    _runMove: function(moveTransitions, animate) {
        moveTransitions.forEach(function(transition) {
            var piece = transition.piece, destCell = transition.destCell;
            if (transition.remove) {
                this._removePiece(piece, animate);
            } else if (transition.add) {
                this._addPiece(piece);
            } else if (transition.move) {
                this._movePiece(piece, destCell, animate);
            }
        }, this);
    },
    moveForward: function(animate) {
        var moveTransitions = this.chessGame.moveForward();
        if (moveTransitions) {
            this._runMove(moveTransitions, animate);
            return true;
        }
    },
    moveBackward: function(animate) {
        var moveTransitions = this.chessGame.moveBackward();
        if (moveTransitions) {
            this._runMove(moveTransitions, animate);
            return true;
        }
    },
    moveToFirst: function(animate) {
        while (this.moveBackward(animate || false)) {}
    },
    moveToLast: function(animate) {
        while (this.moveForward(animate || false)) {}
    },
    flipBoard: function() {
        this._jqBoard.find('.' + this.options.pieceClass).each(function() {
            var self = $(this);
            self.css({
                top: self.css('bottom'),
                bottom: self.css('top'),
                left: self.css('right'),
                right: self.css('left')
            });
        });
        this.options.flippedBoard = !this.options.flippedBoard;
    },
    _initEvents: function() {
        var self = this, links = self.options.links;
        var jq = self._jqWrapper, click = 'click.chess';
        jq.on(click, links.flipBoard, function(e) {
            e.preventDefault();
            self.flipBoard();
        }).on(click, links.nextMove, function(e) {
            e.preventDefault();
            self.moveForward(true);
        }).on(click, links.prevMove, function(e) {
            e.preventDefault();
            self.moveBackward(true);
        });
        if (self.chessGame.notation) {
            jq.find(self.options.notation).html(self.chessGame.notation.html());
        }
    }
};



(function($) {
$.fn.chessGame = function(options) {
    console.time('chess init');
    this.each(function() {
        var self = $(this);
        var opt = $.extend({}, options);

        ['fen', 'pgn', 'cellSize'].forEach(function(property) {
            opt[property] = opt[property] || self.data(property);
        });
        self.data('chess', new ChessGameView(self, opt));
    });
    console.timeEnd('chess init');
    return this;
};
})(jQuery);








(function($) {

    $.extend({}, {
        prototype: {
            // Example transitions
            // ["m:50:e2:6,1"]
            // ["a:50:P:e4", "m:6:4,1:c7"]
            // ["r:50", "m:6:d7:d8"]
            runTransitions: function(transitions) {
                var self = this;
                $.each(transitions, function(i, transition) {
                    var pieces = transition.split(':');
                    var transitionType = pieces[0];
                    var id = pieces[1];

                    switch(transitionType) {
                        case 'r':
                            self.removeDomPiece(id);
                            break;
                        case 'm':
                            self.moveDomPiece(id, { from: pieces[2], to: pieces[3] });
                            break;
                        case 'a':
                            self.addDomPiece(id, pieces[2], pieces[3]);
                            break;
                    }

                });
            },
            validateFen: function(fen) {
                var pattern = /\s*([rnbqkpRNBQKP12345678]+\/){7}([rnbqkpRNBQKP12345678]+)\s[bw\-]\s(([kqKQ]{1,4})|(\-))\s(([a-h][1-8])|(\-))\s\d+\s\d+\s*/;
                return pattern.test(fen);
            },
            // srcSquare = square the piece is currently on
            // dstSquare = square the piece will move to
            cantMoveFromAbsolutePin: function(piece, srcSquare, dstSquare) {
                // Look for an open vector from piece to the king.
                var pieceChar = piece.piece;
                var player = ( pieceChar === pieceChar.toLowerCase() ) ? 'b': 'w';

                var result = this.findAbsolutePin(player, this.pieces.R.vectors, srcSquare, ['R','Q']);
                if (result === null) {
                    result = this.findAbsolutePin(player, this.pieces.B.vectors, srcSquare, ['B','Q']);
                }

                if (result !== null) {
                    var vector = result[0];
                    var kingsSquare = result[1];
                    var pinningPiecesSquare = result[2];
                    if (!this.inSquaresArray(dstSquare, this.squaresBetweenEndPoints(kingsSquare, pinningPiecesSquare))) {
                        return true;
                    }
                }

                return false;
            },
            squaresBetweenEndPoints: function(s,e) {
                var start = this.algebraic2Coord(s);
                var end = this.algebraic2Coord(e);
                var tmp = start;
                var squares = [];
                squares.push(this.coord2Algebraic(start[0],start[1]));

                while (tmp[0] !== end[0] || tmp[1] !== end[1]) {
                    if (tmp[0] < end[0]) { tmp[0] += 1; }
                    if (tmp[0] > end[0]) { tmp[0] -= 1; }
                    if (tmp[1] < end[1]) { tmp[1] += 1; }
                    if (tmp[1] > end[1]) { tmp[1] -= 1; }
                    squares.push(this.coord2Algebraic(tmp[0],tmp[1]));
                }

                return squares;
            },

            findAbsolutePin: function(player, vectors, srcSquare, piecesThatCanPinOnThisVector) {
                // Look at vectors
                var result = this.findVectorToKing(player, vectors, srcSquare);
                if (result !== null) {
                    var vector = result[0];
                    var kingsSquare = result[1];

                    // Find the first piece in opposite direction
                    var flippedVector = this.flipVector(vector);
                    result = this.firstPieceFromSourceAndVector(srcSquare, flippedVector, flippedVector.limit);
                    if (result !== null) {
                        var pinningPiecesSquare = result[1], i;
                        for (i = 0; i < piecesThatCanPinOnThisVector.length; i++) {
                            var pinningPiece = (player === 'w') ?
                                piecesThatCanPinOnThisVector[i].toLowerCase():
                                piecesThatCanPinOnThisVector[i].toUpperCase();

                            if (result[0].piece === pinningPiece) {
                                return [vector, kingsSquare, pinningPiecesSquare];
                            }
                        }
                    }
                }
                return null;
            },

            findVectorToKing: function(player, vectors, srcSquare) {
                var king = (player === 'w') ? 'K': 'k', i;
                for (i = 0; i < vectors.length; i++) {
                    var vector = vectors[i];
                    var result = this.firstPieceFromSourceAndVector(srcSquare, vector, vector.limit);
                    if (result !== null && result[0].piece === king) {
                        return [vector, result[1]];
                    }
                }
                return null;
            },

            findMoveSource: function(piece, srcFile, srcRank, dstFile, dstRank, player) {
                //console.log("Looking for move source for " + piece + " from " + dstRank + dstFile);
                if ( srcFile && srcRank ) {
                    return srcFile + srcRank;
                }

                var dstSquare = dstFile + dstRank, i, size;
                var targetPiece = (player === 'w') ? piece: piece.toLowerCase();
                targetPiece = targetPiece.toString();

                for (i = 0; i < this.pieces[piece].vectors.length; i++) {
                    var vector = this.pieces[piece].vectors[i];

                    for (size = 1; size <= vector.limit; size++) {
                        var result = this.pieceFromSourceAndVector(dstSquare, vector, size);
                        //console.log("Looking at " + result);
                        if (result === null) {
                            break;
                        }
                        if (result[0] === '-') {
                            continue;
                        }

                        if (result[0].piece === targetPiece) {
                            // Check for absolute pin on the piece in question
                            if (this.cantMoveFromAbsolutePin(result[0], result[1], dstSquare)) { break; }

                            if (srcFile) {
                                if (result[1].substr(0,1).toString() === srcFile) {
                                    return result[1];
                                }
                            } else if (srcRank) {
                                if (result[1].substr(1,1).toString() === srcRank) {
                                    return result[1];
                                }
                            } else {
                                return result[1];
                            }
                        } else {
                            break;
                        }
                    }
                }
            },

            findPawnMoveSource: function(dstFile, dstRank, player) {
                var dstSquare = dstFile + dstRank;
                var targetPiece = (player === 'w') ? 'P': 'p';
                var direction = (player === 'w') ? -1: 1;
                var vector = { x: 0, y: direction, limit: 2 }, size;

                for (size = 1; size <= vector.limit; size++) {
                    var result = this.pieceFromSourceAndVector(dstSquare, vector, size);
                    if (result === null) {
                        break;
                    }
                    if (result[0].piece === targetPiece) {
                        return result[1];
                    }
                    if (result[0] !== '-') {
                        break;
                    }
                }
            },

            pieceFromSourceAndVector: function(source, vector, limit) {
                var sourceCoords = this.algebraic2Coord(source);
                var row = sourceCoords[0] - (vector.y * limit);
                var col = sourceCoords[1] - (vector.x * limit);

                if ( row >= 8 || row < 0 || col >= 8 || col < 0 ) {
                    return null;
                }
                piece = [this._board[row][col], this.coord2Algebraic(row, col)];
                return piece;
            },

            firstPieceFromSourceAndVector: function(source, vector, limit) {
                var i;
                for (i = 1; i <= limit; i++) {
                    piece = this.pieceFromSourceAndVector(source, vector, i);
                    if (piece === null) {
                        return null; // End of the board reached
                    }
                    if (piece[0] === '-') {
                        continue; // Square is blank
                    }
                    return piece;
                }
                return null;
            },
            /* Utility Functions */
            algebraic2Coord: function(algebraic) {
                return [this.rank2Row(algebraic.substr(1, 1)), this.file2Col(algebraic.substr(0, 1))];
            },

            coord2Algebraic: function(row, col) {
                return this.col2File(col) + this.row2Rank(row);
            },
            col2File: function(col) {
                return String.fromCharCode( col + ('a').charCodeAt(0) );
            },
           /* Definitions of pieces */
            pieces: {
                R: {
                    vectors: [
                        { x: 0, y: 1, limit: 8 },
                        { x: 1, y: 0, limit: 8 },
                        { x: 0, y: -1, limit: 8 },
                        { x: -1, y: 0, limit: 8 }
                    ]
                },
                N: {
                    vectors: [
                        { x: 1, y: 2, limit: 1 },
                        { x: 2, y: 1, limit: 1 },
                        { x: 2, y: -1, limit: 1 },
                        { x: 1, y: -2, limit: 1 },
                        { x: -1, y: -2, limit: 1 },
                        { x: -2, y: -1, limit: 1 },
                        { x: -2, y: 1, limit: 1 },
                        { x: -1, y: 2, limit: 1 }
                    ]
                },
                B: {
                    vectors: [
                        { x: 1, y: 1, limit: 8 },
                        { x: 1, y: -1, limit: 8 },
                        { x: -1, y: -1, limit: 8 },
                        { x: -1, y: 1, limit: 8 }
                    ]
                },
                Q: {
                    vectors: [
                        { x: 0, y: 1, limit: 8 },
                        { x: 1, y: 0, limit: 8 },
                        { x: 0, y: -1, limit: 8 },
                        { x: -1, y: 0, limit: 8 },

                        { x: 1, y: 1, limit: 8 },
                        { x: 1, y: -1, limit: 8 },
                        { x: -1, y: -1, limit: 8 },
                        { x: -1, y: 1, limit: 8 }
                    ]
                },
                K: {
                    vectors: [
                        { x: 0, y: 1, limit: 1 },
                        { x: 1, y: 0, limit: 1 },
                        { x: 0, y: -1, limit: 1 },
                        { x: -1, y: 0, limit: 1 },

                        { x: 1, y: 1, limit: 1 },
                        { x: 1, y: -1, limit: 1 },
                        { x: -1, y: -1, limit: 1 },
                        { x: -1, y: 1, limit: 1 }
                    ]
                }
            }
        }
    });
})(jQuery);
