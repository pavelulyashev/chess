$(function() {
    var squareSize = 64;
    var white = '#ffffff';
    var black = '#b2b2b2';
    var n = 8;

    var piecesLiterals = 'KQRBNPkqrbnp'.split('');
    var index = {};

    piecesLiterals.forEach(function(pieceLiteral, i) {
        index[pieceLiteral] = i;
    });

    var piecesTheme = 'merida';
    var piecesSprite = new Image();
    piecesSprite.src = ['/static/images/pieces/',
        piecesTheme, '/', squareSize, '.png'].join('');


    var f = '8/1q6/7B/7p/B3N1k1/4K3/1b6/7N w - - 0 1';

    function prepareFen(fen) {
        return fen.split(' ')[0].replace(/(\d)/g, function(d) {
            return "--------".slice(0, d);
        }).split('/');
    }

    var canvasElement = document.getElementById('position-image');
    var imageFromCanvas = document.getElementById('image-from-canvas');
    canvasElement.width = canvasElement.height = n * squareSize;

    piecesSprite.onload = function() {
        (function() {
            // paint the background white
            this.fillStyle = white;
            this.fillRect(0, 0, n * squareSize, n * squareSize);

            // set styles
            this.fillStyle = black;

            // stroke the black cells and row/column indexes
            var x, y, pieceLiteral;
            var fen = prepareFen(f);
            for (x = 0; x < n; x++) {
                for (y = 0; y < n; y++) {
                    if ((x + y) % 2 == 0) {
                        this.fillRect(x * squareSize, y * squareSize,
                                      squareSize, squareSize);
                    }

                    pieceLiteral = fen[y][x];
                    if (pieceLiteral !== '-') {
                        this.drawImage(piecesSprite,
                                       index[pieceLiteral] * squareSize, 0,
                                       squareSize, squareSize,
                                       x * squareSize, y * squareSize,
                                       squareSize, squareSize);
                    }
                }
            }
        }).apply(canvasElement.getContext('2d'));

        imageFromCanvas.src = canvasElement.toDataURL('image/png');
    }
});

