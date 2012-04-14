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
 * Array.prototype.reverse
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
        }
    }
};



var Move = function(token) {
    this.source = token;
    this.parseToken(token);
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
            this.srcFile = RegExp.$2;                             // [a-h]?
            this.srcRank = RegExp.$3;                             // [1-8]?
            this.capturing = Boolean(RegExp.$4);                  // x?
            this.destFile = RegExp.$5;                            // [a-h]
            this.destRank = RegExp.$6;                            // [1-8]
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
    toString: function() {
        var tokens = [], moveNode = this;
        var variationToString = function(variation) {
            tokens.push(['(', variation.toString(), ')'].join(''));
        };
        do {
            if (moveNode.player === 0 || !tokens.length ||
                moveNode.prev.variations) {
                tokens.push(moveNode.getNumberToken());
            }
            tokens.push(moveNode.move);
            if (moveNode.variations) {
                moveNode.variations.forEach(variationToString);
            }
        } while ((moveNode = moveNode.next));
        return tokens.join(' ');
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
                moveNode = new MoveNode(new Move(token), moveNum, player);

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


var ChessPiece = function(letter, file, rank, id) {
    this.letter = letter;
    this.color = letter.match(/[bknqrp]/) ? 'b' : 'w';
    this.id = id;
    this.file = file;
    this.rank = rank;
};
ChessPiece.prototype = {
    constructor: ChessPiece,
    toString: function() {
        return this.letter;
    },
    getClass: function() {
        return this.color + this.letter;
    }
};

var ChessBoard = function(piecePlacement) {
    this.init(piecePlacement);
};
ChessBoard.prototype = {
    constructor: ChessBoard,
    init: function(piecePlacement) {
        var board = [], countPieces = 0, pieces = [];
        piecePlacement = this._numbersToDashes(piecePlacement).split('/');
        piecePlacement.reverse().forEach(function(row, r) {
            row = board[r] = row.split('');
            row.forEach(function(piece, f) {
                if (piece !== '-') {
                    row[f] = new ChessPiece(piece, f, r, ++countPieces);
                    pieces.push(row[f]);
                }
            });
        });
        this._board = board;
        this._pieces = pieces;
    },
    toString: function() {
        var board = this._board.slice().reverse().map(function(row) {
            return row.join(' ');
        }).join('\n');
        return utils.chess.pieces.replaceByUnicode(board);
    },
    getPieces: function() {
        return this._pieces;
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
        if (move.validated === true) {
            return true;
        }

    },
    /*
     * moveForward (moveBackward) returns 
     *     move object if forward (backward) move exists in notation
     *     otherwise returns false
     */
    moveForward: function() {
        var move = this.currentMove.next;
        if (this.isMovePossible(move)) {
            this.currentMove = move;
            return move;
        }

    },
    moveBackward: function() {
        var move = this.currentMove.prev;
        if (this.isMovePossible(move)) {
            this.currentMove = move;
            return move;
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
        links: {
            nextMove: '.next-move',
            prevMove: '.prev-move',
            firstMove: '.first-move',
            lastMove: '.last-move',
            flipBoard: '.flip-board'
        }
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
    _addPiece: function(piece) {
        var cellSize = this.options.cellSize;
        var classes = [this.options.pieceClass, piece.getClass()].join(' ');
        var jqPiece = $('<div/>').addClass(classes);
        jqPiece.attr('data-id', piece.id).css({
            bottom: piece.rank * cellSize,
            left: piece.file * cellSize
        }).appendTo(this._jqBoard);
    },
    _runMove: function(move, isBackward) {
    },
    moveForward: function(animate) {
        var move = this.chessGame.moveForward();
        if (move) {
            this._runMove(move, animate);
            return true;
        }
    },
    moveBackward: function(animate) {
        var move = this.chessGame.moveBackward();
        if (move) {
            this._runMove(move, animate, true);
            return true;
        }
    },
    moveToFirst: function() {
        while (this.moveBackward(false)) {}
    },
    moveToLast: function() {
        while (this.moveForward(false)) {}
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
    },
    _initEvents: function() {
        var self = this, links = self.options.links;
        var jq = self._jqWrapper, click = 'click.chess';
        jq.on(click, links.flipBoard, function(e) { 
            e.preventDefault();
            self.flipBoard();
        }).on(click, links.nextMove, function(e) { 
            e.preventDefault();
            self.moveForward();
        }).on(click, links.prevMove, function(e) { 
            e.preventDefault();
            self.moveBackward();
        });
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
            addDomPiece: function(id, piece, algebraic) {
                var square = this.algebraic2Coord(algebraic);
                if (this.game.boardDirection < 0) {
                    square[0] = 7 - square[0];
                    square[1] = 7 - square[1];
                }

                var posTop = this.settings.squareSize * square[0] + this.settings.offsets.top;
                var posLeft = this.settings.squareSize * square[1] + this.settings.offsets.left;

                var color = 'b';
                if (piece.toUpperCase() === piece) { color = 'w'; }

                this.boardElement().append('<div id="' + this.getDomPieceId(id) + '" class="piece ' + color + piece + '"></div>');
                $('#' + this.getDomPieceId(id), this.wrapper).css({ position: 'absolute', top:posTop, left:posLeft });
            },

            moveDomPiece: function(id, move) {
                var from = this.algebraic2Coord(move.from);
                var to = this.algebraic2Coord(move.to);

                var top = (parseInt(to[0], 10) - parseInt(from[0], 10)) * this.settings.squareSize * this.game.boardDirection;
                var left = (parseInt(to[1], 10) - parseInt(from[1], 10)) * this.settings.squareSize * this.game.boardDirection;

                $('#' + this.getDomPieceId(id)).animate({
                    'top': '+=' + top + 'px', 'left': '+=' + left + 'px'
                }, 'fast');
            },

            removeDomPiece: function(id) {
                $('#' + this.getDomPieceId(id)).remove();
            },

            transitionTo: function(halfmoveNumber) {
                while (halfmoveNumber < this.game.halfmoveNumber) {
                    this.transitionBackward();
                }

                while (halfmoveNumber > this.game.halfmoveNumber) {
                    this.transitionForward();
                }
            },

            transitionForward: function() {
                if (this.game.halfmoveNumber < this.game.transitions.length) {
                    this.runTransitions(this.game.transitions[this.game.halfmoveNumber].forward);
                    this.game.halfmoveNumber++;
                }
            },

            transitionBackward: function() {
                if (this.game.halfmoveNumber > 0) {
                    this.game.halfmoveNumber--;
                    this.runTransitions(this.game.transitions[this.game.halfmoveNumber].backward);
                }
            },

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

            parsePgn: function(pgn) {
                $.each(moves, $.proxy(function(i, move) {
                    if ( /annotation-\d+/.test(move) ) {
                        this.game.annotations[moveNumber] = this.game.rawAnnotations.shift();
                        return;
                    }

                    this.game.moves[moveNumber] = move;

                    // console.log("Processing move: " + moveNumber + '.' + move);
                    var player = (moveNumber % 2 === 0) ? 'w': 'b';
                    var rank, m, piece, srcFile, srcRank, dstsFile, dstRank, src, dst;

                    // If the move was to castle
                    if ( this.patterns.castleQueenside.test(move) ) {
                        rank = (player === 'w') ? 1: 8;
                        this.movePiece(moveNumber, {from: "e" + rank, to: "c" + rank} );
                        this.movePiece(moveNumber, {from: "a" + rank, to: "d" + rank} );

                    } else if ( this.patterns.castleKingside.test(move) ) {
                        rank = (player === 'w') ? 1: 8;
                        this.movePiece(moveNumber, {from: "e" + rank, to: "g" + rank} );
                        this.movePiece(moveNumber, {from: "h" + rank, to: "f" + rank} );

                    // If the move was a piece
                    } else if ( this.patterns.pieceMove.test(move) ) {
                        m = this.patterns.pieceMove.exec(move);
                        piece = m[0];
                        srcFile = null;
                        srcRank = null;
                        dstFile = null;
                        dstRank = null;

                        if ( this.patterns.rankAndFileGiven.test(move) ) {
                            m = this.patterns.rankAndFileGiven.exec(move);
                            srcFile = m[2];
                            srcRank = m[3];
                            dstFile = m[4];
                            dstRank = m[5];
                        } else if ( this.patterns.fileGiven.test(move) ) {
                            m = this.patterns.fileGiven.exec(move);
                            srcFile = m[2];
                            dstFile = m[3];
                            dstRank = m[4];
                        } else if ( this.patterns.rankGiven.test(move) ) {
                            m = this.patterns.rankGiven.exec(move);
                            srcRank = m[2];
                            dstFile = m[3];
                            dstRank = m[4];
                        } else if ( this.patterns.nothingGiven.test(move) ) {
                            m = this.patterns.nothingGiven.exec(move);
                            dstFile = m[2];
                            dstRank = m[3];
                        }

                        src = this.findMoveSource(piece, srcFile, srcRank, dstFile, dstRank, player);
                        this.movePiece(moveNumber, {from: src, to: dstFile + dstRank} );

                        // If the move was a pawn
                    } else {
                        dstFile = null;
                        dstRank = null;

                        if ( this.patterns.pawnMove.test(move) ) {
                            m = this.patterns.pawnMove.exec(move);
                            dstFile = m[1];
                            dstRank = m[2];
                            src = this.findPawnMoveSource(dstFile, dstRank, player);
                            dst = dstFile + dstRank;
                            this.movePiece(moveNumber, {from: src, to: dst} );

                            // Pawn capture
                        } else if ( this.patterns.pawnCapture.test(move) ) {
                            m = this.patterns.pawnCapture.exec(move);
                            dstFile = m[2];
                            dstRank = m[3];
                            srcFile = m[1];
                            srcRank = parseInt(dstRank, 10) + ( (player === 'w') ? -1: 1 );

                            // En passant
                            var result = this.pieceAt(dstFile + dstRank);
                            if (result === '-') {
                                this.removePiece(moveNumber, dstFile + srcRank);
                            }
                            this.movePiece(moveNumber, {from: srcFile + srcRank, to: dstFile + dstRank });
                        }

                        // Queening
                        if ( this.patterns.pawnQueen.test(move) ) {
                            this.removePiece(moveNumber, dstFile + dstRank);

                            m = this.patterns.pawnQueen.exec(move);
                            var queeningPiece = m[1];
                            queeningPiece = (player === 'w') ? queeningPiece: queeningPiece.toLowerCase();
                            this.addPiece(moveNumber, queeningPiece, dstFile + dstRank);
                        }
                    }

                    moveNumber++;
                }, this));
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

            inSquaresArray: function(square, squares) {
                var i;
                for (i = 0; i < squares.length; i++) {
                    if (squares[i] === square) {
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

            pieceAt: function(algebraic) {
                var square = this.algebraic2Coord(algebraic);
                return this._board[square[0]][square[1]];
            },

            // Ex: this.movePiece({from: 'e2', to: 'e4'})
            movePiece: function(num, move) {
                // console.log("Moving a piece: (" + num + ") " + " from " + move.from + " to " + move.to);

                var from = this.algebraic2Coord(move.from);
                var to = this.algebraic2Coord(move.to);
                var piece = this.pieceAt(move.from);

                if (this.pieceAt(move.to).piece) {
                    this.removePiece(num, move.to);
                }

                this._board[to[0]][to[1]] = this._board[from[0]][from[1]];
                this._board[from[0]][from[1]] = '-';

                this.saveTransition({type: 'm', num: num, domId: piece.id, from: move.from, to: move.to});
            },

            removePiece: function(num, algebraic) {
                var piece = this.pieceAt(algebraic);

                var square = this.algebraic2Coord(algebraic);
                this._board[square[0]][square[1]] = '-';

                this.saveTransition({type: 'r', num: num, domId: piece.id, piece: piece.piece, from: algebraic});
            },

            addPiece: function(num, pieceChar, algebraic) {

                var square = this.algebraic2Coord(algebraic);
                var id = this.getNextPieceId();
                this._board[square[0]][square[1]] = { id: id, piece: pieceChar };

                this.saveTransition({type: 'a', num: num, domId: id, to: algebraic, piece: pieceChar});
            },

            // transitions = { 1: { forward: ["m:50:4,1:6,1"], backward: ["m:50:6,1:4,1"] },
            // 2:{ forward: ["a:50:P:4,1", "m:6:4,1:1,4"], backward: ["r:50", "m:6:1,4:4,1"] } }
            saveTransition: function(options) {
                var forward = null;
                var backward = null;
                var num = options.num;

                if (options.type === 'a') {
                    forward = ["a:" + options.domId + ":" + options.piece + ":" + options.to];
                    backward = ["r:" + options.domId];
                } else if (options.type === 'm') {
                    forward = ["m:" + options.domId + ":" + options.from + ":" + options.to];
                    backward = ["m:" + options.domId + ":" + options.to + ":" + options.from];
                } else if (options.type === 'r') {
                    forward = ["r:" + options.domId];
                    backward = ["a:" + options.domId + ":" + options.piece + ":" + options.from];
                }

                if (!this.game.transitions[num]) {
                    this.game.transitions[num] = { forward: forward, backward: backward };
                } else {
                    this.game.transitions[num].forward = this.game.transitions[num].forward.concat(forward);
                    this.game.transitions[num].backward = backward.concat(this.game.transitions[num].backward);
                }
            },
            /* Utility Functions */
            algebraic2Coord: function(algebraic) {
                return [this.rank2Row(algebraic.substr(1, 1)), this.file2Col(algebraic.substr(0, 1))];
            },

            coord2Algebraic: function(row, col) {
                return this.col2File(col) + this.row2Rank(row);
            },

            rank2Row: function(rank) {
                return 8 - parseInt(rank, 10);
            },

            file2Col: function(file) {
                return file.charCodeAt(0) - ('a').charCodeAt(0);
            },

            row2Rank: function(row) {
                return (8 - row) + '';
            },

            col2File: function(col) {
                return String.fromCharCode( col + ('a').charCodeAt(0) );
            },

            flipVector: function(v) {
                return { x: (v.x * -1), y: (v.y * -1), limit: v.limit };
            },

            replaceNumberWithDashes: function(str) {
                var numSpaces = parseInt(str, 10);
                var newStr = '', i;
                for (i = 0; i < numSpaces; i++) { newStr += '-'; }
                return newStr;
            },

            pluckAnnotation: function(str) {
                this.game.rawAnnotations = this.game.rawAnnotations || [];
                var annNum = this.game.rawAnnotations.length;
                var annot = str.substring(1,str.length-1); // Remove curly brackets
                annot = annot.replace(/\\\{/g, '{');
                annot = annot.replace(/\\\}/g, '}');

                if (this.settings.jsonAnnotations) {
                    annot = JSON.parse(annot);
                }

                this.game.rawAnnotations.push(annot);
                return "annotation-" + annNum;
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
