(function($) {
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
var debug = true;


var utils = {
    extend: $.extend,
    trim: $.trim,
    random: function() {
        return Math.ceil(Math.random() * 1e5);
    },
    signum: function(a, b) {
        var delta = a - b;
        return delta && delta / Math.abs(delta);
    },
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
                    if (rank === 3) {
                        cells.push({ file: file, rank: rank - 2 });
                    }
                } else if (piece === 'p') {
                    if (move.capturing) {
                        cells = [{ file: file - 1, rank: rank + 1 },
                                 { file: file + 1, rank: rank + 1 }];
                    }
                    cells.push({ file: file, rank: rank + 1 });
                    if (rank === 4) {
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
    if (this.castling) {
        this.setCastlingPieces(player);
    } else {
        this.reduceFileAndRankToCoordinates();
        this.reducePieceByPlayer(player);
    }
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
            if (debug) { console.assert(false, 'Invalid move format'); }
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
    setCastlingPieces: function(player) {
        var rank = player === 0 ? 0 : 7;
        var files = this.castlingSide === 'king' ? [4, 6, 7, 5] : [4, 2, 0, 3];
        this.king = {
            src: { file: files[0], rank: rank },
            dest: { file: files[1], rank: rank },
            piece: player === 0 ? 'K' : 'k'
        };
        this.rook = {
            src: { file: files[2], rank: rank },
            dest: { file: files[3], rank: rank },
            piece: player === 0 ? 'R' : 'r'
        };
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
    this.uid = utils.random();
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
                       'nesting-' + this.nesting, this.getClass()].join(' ');
        return ['<span class="', classes, '" data-uid="', this.uid, '">',
                this.move, '</span>'].join('');
    },
    getNumberToken: function() {
        return this.number + (this.player === 0 ? '.' : '...');
    },
    addNext: function(moveNode) {
        var numbersDiff = moveNode.number - this.number;
        if (debug) {
            console.assert(this.player === undefined || 
                        this.player !== moveNode.player,
                        'Consequtive moves for one player', this, moveNode);
            console.assert(this.player === undefined || 
                        this.player === 0 && numbersDiff === 0 ||
                        this.player === 1 && numbersDiff === 1,
                        'Invalid numbers for consequtive moves', this, moveNode);
        }
        this.next = moveNode;
        moveNode.prev = this;
    },
    addVariation: function(moveNode) {
        var parent = this;
        while (parent.variation) { parent = parent.variation; }
        parent.variation = moveNode;
        moveNode.prev = this.prev;
        moveNode.nesting = this.nesting + 1;

        this.variations = (this.variations || []).concat(moveNode);
    },
    getClass: function() {
        return 'move-' + this.uid;
    }
};


var ChessNotation = function(pgn) {
    this.source = pgn;
    this.movesByUid = {};
    this.parsePgn(this.preparePgn(pgn));
};
ChessNotation.prototype = {
    constructor: ChessNotation,
    toString: function() {
        return [this.tree.next.toString(), this.result].join(' ');
    },
    html: function() {
        var result = '<span class="result">' + this.result + '</span>';
        return [this.tree.next.toString(true), result].join(' ');
    },
    patterns: {
        split: /(\{[^}]*\})|(\d+\.(?:\.\.)?)|[()]|([^\s()]+)/g,
        number: /^(\d+)\.(\.\.)?$/,
        result: /^1\-0|1\/2\-1\/2|0\-1|\*$/,
        annotation: /^\{([^}]*)\}$/
    },
    preparePgn: function(pgn) {
        return utils.chess.nag.replace(pgn);
    },
    parsePgn: function(pgn) {
        var tokens = pgn.match(this.patterns.split);
        if (debug) {console.assert(tokens !== null, 'Invalid notation'); }

        this.createVariantsTree(tokens);
    },
    createVariantsTree: function(tokens) {
        var i = 0, token, roots = [];
        var rootNode, leafNode, moveNum, player, moveNode, newBranch = true;
        this.tree = new MoveNode();

        while ((token = tokens[i++])) {
            if (token.match(this.patterns.number)) {
                moveNum = Number(RegExp.$1);
                player = Number(Boolean(RegExp.$2));
            } else if (token === '(') {
                newBranch = true;
            } else if (token === ')') {
                newBranch = false;
                leafNode = rootNode.prev.next;
                roots.pop();
                rootNode = roots[roots.length - 1];
            } else if (token.match(this.patterns.result)) {
                this.result = RegExp.$_;
            } else if (token.match(this.patterns.annotation)) {
                leafNode.move.addAnnotation(RegExp.$1);
            } else {
                moveNode = new MoveNode(new Move(token, player),
                                        moveNum, player);
                this.movesByUid[moveNode.uid] = moveNode;

                if (newBranch) {
                    if (leafNode) {
                        leafNode.addVariation(moveNode);
                    } else {
                        this.tree.addNext(leafNode = moveNode);
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
    noPiecesBetweenEndPoints: function(move, src) {
        if (!move.piece.match(/[QRBP]/i)) {
            return true;
        }

        var dest = move.dest, cell = { file: src.file, rank: src.rank };
        var fileDelta = utils.signum(dest.file, src.file);
        var rankDelta = utils.signum(dest.rank, src.rank);
        while (cell.rank !== dest.rank || cell.file !== dest.file) {
            cell.rank += rankDelta;
            cell.file += fileDelta;
            if (this.getPiece(cell)) {
                return false;
            }
        }
        return true;
    },
    noCheckIfMoveThisPiece: function(move, src) {
        var king = this.getKing(move), piece;
        var matchPieces = king.piece === 'K' ? /[qrb]/ : /[QRB]/;
        var cell = { file: src.file, rank: src.rank };
        var fileDelta = utils.signum(src.file, king.file);
        var rankDelta = utils.signum(src.rank, king.rank);
        while (cell.rank >= 0 && cell.rank <= 7 &&
               cell.file >= 0 && cell.file <= 7) {
            cell.rank += rankDelta;
            cell.file += fileDelta;
            piece = this.getPiece(cell);
            if (piece) {
                return !piece.piece.match(matchPieces);
            }
        }
        return true;
    },
    getKing: function(move) {
        if (move.piece.match(/[QRBNP]/)) {
            return this._pieces.K[0];
        }
        return this._pieces.k[0];
    },
    getPieces: function() {
        var pieces = [];
        Object.keys(this._pieces).forEach(function(key) {
            pieces = pieces.concat(this[key]);
        }, this._pieces);
        return pieces;
    },
    getSourcePiece: function(move) {
        var cells = utils.chess.pieces.getPossibleSourceCells(move), cell;
        cells = cells.filter(function(cell) {
            var chessPiece = this.getPiece(cell);
            return chessPiece && chessPiece.piece === move.piece &&
                   (!move.src.rank || move.src.rank === cell.rank) &&
                   (!move.src.file || move.src.file === cell.file);
        }, this);
        if (cells.length > 1) {
            cells = cells.filter(function(cell) {
                return this.noPiecesBetweenEndPoints(move, cell) &&
                       this.noCheckIfMoveThisPiece(move, cell);
            }, this);
        }
        
        cell = cells[0];
        return cell && this.getPiece(cell);
    },
    runMove: function(moveTransitions) {
        moveTransitions.forEach(function(transition) {
            var piece = transition.piece, destCell = transition.destCell;
            if (transition.add) {
                this._addPiece(piece);
            } else if (transition.move) {
                this._movePiece(piece, destCell);
            } else if (transition.promote) {
                this._promotePiece(piece, transition.changeBy);
            }
        }, this);
    },
    getPiece: function(cell) {
        return this._board[cell.rank][cell.file];
    },
    _addPiece: function(piece) {
        return (this._board[piece.rank][piece.file] = piece);
    },
    _movePiece: function(piece, destCell) {
        this._board[destCell.rank][destCell.file] = piece;
        this._board[piece.rank][piece.file] = null;
        piece.rank = destCell.rank;
        piece.file = destCell.file;
    },
    _promotePiece: function(piece, changeBy) {
        piece.oldClass = piece.getClass();
        piece.piece = changeBy;
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
        try {
            this.parsePgn(this.options.pgn);
            this.currentMove = this.notation.tree;
        } catch (e) {
            if (debug) { console.error(e); }
        }
    }
    if (debug) { console.log(this.board + ''); }
};
ChessGame.prototype = {
    constructor: ChessGame,
    defaults: {
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    },
    patterns: {
        header: /\[(\w+) (["'])([^\]]*)\2\]/g,
        notation: /(\d+\.(\.\.)? [BNKQROa-h].*(1\-0|1\/2\-1\/2|0\-1|\*))/
    },
    parseFen: function(fen) {
        if (debug) { console.assert(fen, 'Given FEN is empty', fen); }

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
            this.notation = new ChessNotation(RegExp.$1);
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
        return true;
    },
    getForwardTransitions: function(move) {
        if (move.castling) {
            return [{
                move: true,
                piece: this.board.getPiece(move.king.src),
                destCell: move.king.dest
            }, {
                move: true,
                piece: this.board.getPiece(move.rook.src),
                destCell: move.rook.dest
            }];
        }

        var piece = this.board.getSourcePiece(move);
        var transitions = [{
            move: true,
            piece: piece,
            destCell: move.dest
        }];
        move.src.file = piece.file;
        move.src.rank = piece.rank;

        if (move.piece.toLowerCase() === 'p') {
            if (Math.abs(move.dest.rank - move.src.rank) === 2) {
                move.enPassant = true;
            }
            if (move.capturing && !this.board.getPiece(move.dest)) {
                var cell = {
                    file: move.dest.file,
                    rank: move.dest.rank + (move.piece === 'P' ? -1 : 1)
                };
                move.enPassantCapture = true;
                transitions.push({
                    remove: true,
                    piece: (move.capturedPiece = this.board.getPiece(cell))
                });
            }
        }

        if (move.capturing && !move.enPassantCapture) {
            transitions.push({
                remove: true,
                piece: (move.capturedPiece = this.board.getPiece(move.dest))
            });
        }
        if (move.pawnPromotion) {
            move.originalPiece = move.piece;
            transitions.push({
                promote: true,
                piece: piece,
                changeBy: move.pawnPromotion
            });
        }
        return transitions;
    },
    getBackwardTransitions: function(move) {
        if (move.castling) {
            return [{
                move: true,
                piece: this.board.getPiece(move.king.dest),
                destCell: move.king.src
            }, {
                move: true,
                piece: this.board.getPiece(move.rook.dest),
                destCell: move.rook.src
            }];
        }

        var transitions = [{
            move: true,
            piece: this.board.getPiece(move.dest),
            destCell: move.src
        }];
        if (move.capturing) {
            transitions.push({
                add: true,
                piece: move.capturedPiece
            });
        }
        if (move.pawnPromotion) {
            transitions.push({
                promote: true,
                piece: this.board.getPiece(move.dest),
                changeBy: move.originalPiece
            });
        }
        return transitions;
    },
    /*
     * moveForward (moveBackward) returns
     *     move object if forward (backward) move exists in notation
     *     otherwise returns false
     */
    moveForward: function(move) {
        var moveNode = move || this.currentMove.next, transitions;
        if (moveNode && this.isMovePossible(moveNode.move)) {
            transitions = this.getForwardTransitions(moveNode.move);
            this.currentMove = moveNode;
            this.board.runMove(transitions);
            if (debug) { console.log(this.board + '', moveNode.move + ''); }
            return transitions;
        }
    },
    moveBackward: function() {
        var moveNode = this.currentMove, transitions;
        if (moveNode.move && this.isMovePossible(moveNode.move)) {
            transitions = this.getBackwardTransitions(moveNode.move);
            this.currentMove = moveNode.prev;
            this.board.runMove(transitions);
            if (debug) { console.log(this.board + '', moveNode.move + ''); }
            return transitions;
        }
    },
    moveNextVariation: function(moveNode) {
        var transitions;
        if (moveNode && this.isMovePossible(moveNode.move)) {
            transitions = this.getForwardTransitions(moveNode.move);
            this.currentMove = moveNode;
            this.board.runMove(transitions);
            if (debug) { console.log(this.board + '', moveNode.move + ''); }
            return transitions;
        }
    },
    variationExists: function() {
        return this.currentMove.variation;
    },
    getPathToMove: function(uid) {
        var moveNode = this.notation.movesByUid[uid], moves = [];
        while (moveNode.prev) {
            moves.unshift(moveNode);
            moveNode = moveNode.prev;
        }
        return moves;
    }
};


var ChessGameView = function(jqWrapper, options) {
    var game = this.chessGame = new ChessGame(options);
    this._jqWrapper = jqWrapper;
    this.options = utils.extend({}, this.defaults, options);
    this._initBoard();
    this._initPieces(game.board.getPieces());
    this._initEvents();
    this._initNotation();
    this._dfdMove = $.Deferred().resolve();
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
            nextVariation: '.next-variation',
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
            return animate ? hiddenPiece.fadeIn('fast') : hiddenPiece.show();
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
        return animate ? piece.fadeOut('fast') : piece.hide();
    },
    _movePiece: function(piece, destCell, animate) {
        var opt = this.options, position = utils.chess.coord.getCellPosition;
        var newPos = position(opt.cellSize, destCell, opt.flippedBoard);
        var jqPiece = this._getPiece(piece.id);
        return animate ? jqPiece.animate(newPos, 'fast') : jqPiece.css(newPos);
    },
    _promotePiece: function(piece) {
        var jqPiece = this._getPiece(piece.id);
        return jqPiece.removeClass(piece.oldClass).addClass(piece.getClass());
    },
    _runMove: function(moveTransitions, animate) {
        var self = this, dfdNextMove = $.Deferred();
        self._dfdMove.done(function() {
            var animations = moveTransitions.map(function(transition) {
                var piece = transition.piece, destCell = transition.destCell;
                var animation = null;
                if (transition.remove) {
                    animation = self._removePiece(piece, animate);
                } else if (transition.add) {
                    animation = self._addPiece(piece, animate);
                } else if (transition.move) {
                    animation = self._movePiece(piece, destCell, animate);
                } else if (transition.promote) {
                    animation = self._promotePiece(piece);
                }
                return animation;
            });
            if (animate) {
                $.when.apply($, animations).done(function() {
                    setTimeout(function() {
                        dfdNextMove.resolve();
                    }, 200);
                });
            } else {
                dfdNextMove.resolve();
            }
        });
        self._dfdMove = dfdNextMove;
    },
    _highlightMove: function(move) {
        this._jqNotation.find('.move.active').removeClass('active');
        this._jqNotation.find('.' + move.getClass()).addClass('active');
    },
    moveForward: function(animate, move) {
        var moveTransitions = this.chessGame.moveForward(move);
        if (moveTransitions) {
            this._runMove(moveTransitions, animate);
            this._highlightMove(this.chessGame.currentMove);
            return true;
        }
    },
    moveBackward: function(animate) {
        var moveTransitions = this.chessGame.moveBackward();
        if (moveTransitions) {
            this._runMove(moveTransitions, animate);
            this._highlightMove(this.chessGame.currentMove);
            return true;
        }
    },
    moveNextVariation: function(animate) {
        var variation = this.chessGame.variationExists();
        if (variation && this.moveBackward()) {
            var moveTransitions = this.chessGame.moveNextVariation(variation);
            if (moveTransitions) {
                this._runMove(moveTransitions, animate);
                this._highlightMove(this.chessGame.currentMove);
                return true;
            }
        }
    },
    moveToFirst: function(animate) {
        if (debug) { console.time('moveToFirst'); }
        while (this.moveBackward(animate || false)) {}
        if (debug) { console.timeEnd('moveToFirst'); }
    },
    moveToLast: function(animate) {
        if (debug) { console.time('moveToLast'); }
        while (this.moveForward(animate || false)) {}
        if (debug) { console.timeEnd('moveToLast'); }
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
        }).on(click, links.firstMove, function(e) {
            e.preventDefault();
            self.moveToFirst(false);
        }).on(click, links.lastMove, function(e) {
            e.preventDefault();
            self.moveToLast(false);
        }).on(click, links.nextVariation, function(e) {
            e.preventDefault();
            self.moveNextVariation(true);
        });

        var timeoutId = null;
        $(document).on('keyup.chess', function(e) {
            clearTimeout(timeoutId);
            timeoutId = null;

            if (e.keyCode === 37) {             // Left arrow
                if (e.shiftKey) {
                    self.moveToFirst(false);
                } else {
                    self.moveBackward(true);
                }
            } else if (e.keyCode === 39) {      // Right arrow
                if (e.shiftKey) {
                    self.moveToLast(false);
                } else {
                    self.moveForward(true);
                }
            } else if (e.keyCode === 40) {      // Down arrow
                self.moveNextVariation(true);
            }
            e.preventDefault();
        }).on('keydown.chess', function(e) {
            var keyCode = e.keyCode, run; 
            if (!timeoutId && (keyCode === 37 || keyCode === 39)) {
                run = function() {
                    if (keyCode === 39) { 
                        self.moveForward(true);
                    } else {
                        self.moveBackward(true);
                    }
                    timeoutId = setTimeout(run, 600);
                };
                timeoutId = setTimeout(run, 600);
            } 
            e.preventDefault();
        });
    },
    _initNotation: function() {
        var self = this;
        self._jqNotation = self._jqWrapper.find(self.options.notation);
        if (self.chessGame.notation) {
            self._jqNotation.html(self.chessGame.notation.html());
            self._jqNotation.find('.move').click(function() {
                var uid = $(this).data('uid');
                self._selectMove(uid);
            });
        }
    },
    _selectMove: function(uid) {
        if (debug) { console.time('select move'); }
        var moves = this.chessGame.getPathToMove(uid);
        this.moveToFirst();
        moves.forEach(function(move) {
            this.moveForward(false, move);
        }, this);
        if (debug) { console.timeEnd('select move'); }
    }
};



$.fn.chessGame = function(options) {
    debug = (options && options.debug) || debug;

    if (debug) { console.time('chess init'); }
    this.each(function() {
        var self = $(this);
        var opt = $.extend({}, options);

        ['fen', 'pgn', 'cellSize'].forEach(function(property) {
            opt[property] = opt[property] || self.data(property);
        });
        self.data('chess', new ChessGameView(self, opt));
    });
    if (debug) { console.timeEnd('chess init'); }
    return this;
};
})(jQuery);
