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
    this.parsePgn(pgn);
};
ChessNotation.prototype = {
    constructor: ChessNotation,
    toString: function() {
        return [this.tree.toString(), this.result].join(' ');
    },
    patterns: {
        split: /(\{[^}]*\})|[()]|([^\s()]+)/g,
        number: /^(\d+)\.(\.\.)?$/,
        result: /^1\-0|1\/2\-1\/2|0\-1$/,
        annotation: /^\{([^}]*)\}$/
    },
    parsePgn: function(pgn) {
        var tokens = pgn.match(this.patterns.split);
        if (tokens === null) { 
            console.assert(false, 'Invalid notation');
        }

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













(function($) {
    /* Constructor */
    $.chess = function(options, wrapper) {
        this.settings = $.extend( {}, $.chess.defaults, options );
        this.wrapper = wrapper;

        this.game = {
            activeColor: 'w',
            castlingAvailability: 'KQkq',
            enPassantSquare: '-',
            halfmoveClock: 0,
            fullmoveNumber: 1,
            halfmoveNumber: 0,

            header: [],
            body: '',
            moves: [],
            annotations: [],
            rawAnnotations: [],

            nextPieceId: 64,
            transitions: [],
            boardDirection: 1
        };

    };

    /* Add chess() to the jQuery namespace */
    $.fn.chess = function(options) {
        var chess = new $.chess(options, this[0]);
        chess.init();
        return chess;
    };

    $.extend($.chess, {

        defaults: {
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            squareSize: 44,
            offsets: { left: 0, top: 0},
            boardElementSelector: '.chess-board',
            jsonAnnotations: false
        },

        prototype: {
            init: function() {
                // Load a fresh board position
                this.setUpBoard( this.parseFen( this.settings.fen ) );

                // If pgn was passed in, parse it
                if (this.settings.pgn) {
                    try {
                        this.parsePgn(this.settings.pgn);
                    } catch (e) {}
                }

                this.setUpBoard( this.parseFen( this.settings.fen ) );
                this.writeBoard();
            },

            boardElement: function() {
                return $(this.wrapper).find(this.settings.boardElementSelector);
            },

            boardData: function() {
                return this._board;
            },

            setUpBoard: function(template) {
                this._board = this.createBoardDataFromTemplate(template);
            },

            createBoardDataFromTemplate: function(template) {
                var board = [];
                $.each(template, function(j, row) {
                    board[j] = [];
                    $.each(row, function(k, val) {
                        if (val !== '-') {
                            board[j][k] = { 
                                id: (k + 1) + (j * 8) , 
                                piece: template[j][k].toString() 
                            };
                        } else {
                            board[j][k] = '-';
                        }
                    });
                });

                return board;
            },

            writeBoard: function() {
                var self = this;
                if (self.boardElement().size() === 0) {
                    $(self.wrapper).append('<div class="chess-board"></div>');
                }

                $.each(self.boardData(), function(j, row) {
                    $.each(row, function(k, val) {
                        var piece = self.boardData()[j][k];
                        var square = self.coord2Algebraic(j,k);

                        if (piece !== '-') {
                            self.addDomPiece(piece.id, piece.piece, square);
                        }
                    });
                });
            },

            getDomPieceId: function(id) {
                return this.wrapper.id + "_piece_" + id;
            },

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

            clearBoard: function() {
                this.boardElement().empty();
            },

            flipBoard: function() {
                var boardLength = this.settings.squareSize * 7;
                var offsets = this.settings.offsets;

                this.boardElement().children().each(function() {
                    var topVal = parseInt($(this).css('top'), 10) - offsets.top;
                    var leftVal = parseInt($(this).css('left'), 10) - offsets.left;
                    $(this).css('top', (boardLength - topVal) + offsets.top);
                    $(this).css('left', (boardLength - leftVal) + offsets.left);
                });

                this.game.boardDirection *= -1;
            },

            parseFen: function(fen) {
                // rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
                var newBoard = [], j, k, row;
                var fenParts = $.trim(fen).split(/\/|\s/);

                for (j = 0; j < 8; j++) {
                    newBoard[j] = [];
                    row = fenParts[j].replace(/\d/g, this.replaceNumberWithDashes);
                    for (k = 0; k < 8; k++) {
                        newBoard[j][k] = row.substr(k, 1);
                    }
                }
                return newBoard;
            },

            validateFen: function(fen) {
                var pattern = /\s*([rnbqkpRNBQKP12345678]+\/){7}([rnbqkpRNBQKP12345678]+)\s[bw\-]\s(([kqKQ]{1,4})|(\-))\s(([a-h][1-8])|(\-))\s\d+\s\d+\s*/;
                return pattern.test(fen);
            },

            parsePgn: function(pgn) {
                // Do a little clean up on the string
                pgn = $.trim(pgn).replace(/\n|\r/g, ' ').replace(/\s+/g, ' ');
                var instance = this;
                // Recognize escaped closing curly brackets as part of the comment
                // This allows us to have json encoded comments
                pgn = pgn.replace(/\{((\\\})|([^}]))+\}/g, function(){ return instance.pluckAnnotation.apply(instance, arguments); });

                var headers = ['Event','Site','Date','Round','White','Black','Result'], i;
                for (i = 0; i < headers.length; i++) {
                    var re = new RegExp(headers[i] + ' "([^"]*)"]');
                    var result = re.exec(pgn);
                    this.game.header[headers[i]] = (result === null) ? "": result[1];
                }

                // Find the body
                // this.game.body = /(1\. ?(N[acfh]3|[abcdefgh][34]).*)/m.exec(pgn)[1];
                this.game.body = /(1\..+)/m.exec(pgn)[1];

                // Remove numbers, remove result
                this.game.body = this.game.body.replace(new RegExp("1-0|1/2-1/2|0-1"), '')
                                               .replace(/(\d+\.+)|x|(\$\d*)/g, '');

                var moves = $.trim(this.game.body).split(/\s+/);
                // console.log(moves);

                // This must be a separate variable from i, since annotations don't
                // count as moves.
                var moveNumber = 0;

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

            getNextPieceId: function() {
                return ++this.game.nextPieceId;
            },

            getMove: function(n) {
                n = n || this.game.halfmoveNumber;
                return this.game.moves[n -1];
            },

            getFormattedMove: function(n) {
                n = n || this.game.halfmoveNumber;
                var f = Math.ceil(n / 2.0);
                var hellip = (n % 2 === 0) ? '... ': '';
                return f + ". " + hellip + this.getMove(n);
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

            annotation: function() {
                var defaultValue = (this.settings.jsonAnnotations ? []: '');
                return this.game.annotations[this.game.halfmoveNumber] || defaultValue;
            },

            addAnnotation: function(annotation) {
                var currentAnnotations = this.annotation();
                if (typeof currentAnnotations === "string") {
                    currentAnnotations += ", " + annotation;
                } else {
                    currentAnnotations.push(annotation);
                }

                this.game.annotations[this.game.halfmoveNumber] = currentAnnotations;
            },

            debugBoard: function() {
                var self = this;
                $.each(this.boardData(), function(j, row) {
                    $.each(row, function(k, val) {
                        console.log('[' + j + ',' + k + '] = { id: ' + self.boardData()[j][k].id + ', piece: ' + self.boardData()[j][k].piece + ' }');
                    });
                });
            },

            /* Patterns used for parsing */
            patterns: {
                castleKingside : /^O-O/,
                castleQueenside : /^O-O-O/,

                pieceMove : /^([BKNQR])/,
                rankAndFileGiven: /^([BKNQR])([a-h])([1-8])x?([a-h])([1-8])/,
                fileGiven : /^([BKNQR])([a-h])x?([a-h])([1-8])/,
                rankGiven : /^([BKNQR])([1-8])x?([a-h])([1-8])/,
                nothingGiven : /^([BKNQR])x?([a-h])([1-8])/,

                pawnMove : /^([a-h])([1-8])/,
                pawnCapture : /^([a-h])x([a-h])([1-8])/,
                pawnQueen : /\=([BNQR])/
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
