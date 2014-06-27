function Map(options) {

    var self = this;

    var SYMBOL_TYPES = {
        '#': 'wall',
        '$': 'wall',
        'space': 'space',
        '_': 'start',
        'f': 'finish'
    };

    this.options = {
        width: 5,
        height: 5,
        container: ".container",
        wrapperClass: "map-wrapper",
        columnClass: "map-column",
        rowClass: "map-row",
        cellClass: "map-cell",
        cellSize: 20
    };

    $.extend(this.options, options);

    this.cells = [];
    this.base = [];

    var fillCells = function (cells, x, y) {
        if (typeof(self[cells][x]) === 'undefined') {
            self[cells][x] = [];
        }
        self[cells][x][y] = {
            symbol: " ",
            type: "space",
            color: "black",
            backgroundColor: "white"
        };
    };

    function init() {
        for (var y = 0; y < self.options.height; y++) {
            for (var x = 0; x < self.options.width; x++) {
                fillCells('cells', x, y);
                fillCells('base', x, y);
            }
        }
        return {y: y, x: x};
    }

    init();

    this.fillFromString = function(mapStr, color, backColor) {

        var len = mapStr.length;
        var current = 0;

        init();

        for (var y = 0; y < this.options.height; y++) {
            for(var x = 0; x < this.options.width; x++) {
                if (typeof(this.cells[x]) === 'undefined') {
                    this.cells[x] = [];
                }
                if (typeof(this.base[x]) === 'undefined') {
                    this.base[x] = [];
                }
                this.cells[x][y] = {
                    symbol: mapStr[current],
                    type: mapStr[current] !== ' ' ? SYMBOL_TYPES[mapStr[current]] : SYMBOL_TYPES.space,
                    color: color,
                    backgroundColor: backColor
                };
                this.base[x][y] = {
                    symbol: mapStr[current],
                    type: mapStr[current] !== ' ' ? SYMBOL_TYPES[mapStr[current]] : SYMBOL_TYPES.space,
                    color: color,
                    backgroundColor: backColor
                };
                current++;
            }
        }
    };

    this.fillFromFile = function(filename, callback) {
        $.get(filename, function(data) {
            data = data.replace(/(?:\r\n|\r|\n)/g, '');
            self.fillFromString(data, "green", "black");
            callback();
        });
    };

    this.display = function() {
        var c = $(self.options.container);
        var wrapper = $('<div></div>')
            .addClass(self.options.wrapperClass)
            .css({
                width: (self.options.cellSize * self.options.width) + 2 + 'px',
                height: (self.options.cellSize * self.options.height) + 2 + 'px',
                position: "relative",
                margin: "30px auto"

            })

            .appendTo(c);

        //alert();

        for (var y = 0; y < this.options.height; y++) {
            for(var x = 0; x < this.options.width; x++) {
                var cell = $('<div></div>')
                    .addClass(self.options.cellClass)
                    .css({
                        width: self.options.cellSize,
                        height: self.options.cellSize,
                        float: 'left',
                        position: 'relative',
                        display: 'table-cell',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                    })
                    .addClass(self.options.columnClass + '-' + x)
                    .addClass(self.options.rowClass + '-' + y)

                    .text(self.cells[x][y].symbol)
                    .css({
                        color: self.cells[x][y].color,
                        backgroundColor: self.cells[x][y].backgroundColor
                    })

                    .appendTo(wrapper);

                self.cells[x][y].view = cell;

            }
        }

    };

    this.append = function(func) {
        eval(func);
        f.apply(this);
    };

    this.redraw = function() {
        for (var y = 0; y < this.options.height; y++) {
            for(var x = 0; x < this.options.width; x++) {

                self.cells[x][y].view.text(self.base[x][y].symbol);
                self.cells[x][y].view.css('color', self.base[x][y].color);
                self.cells[x][y].symbol = self.base[x][y].symbol;
                self.cells[x][y].type = self.base[x][y].type;

            }
        }
    };

    this.remove = function() {
        $(self.options.container + " ." + self.options.wrapperClass).remove();
    };

    this.reload = function(options) {

        this.remove();

        $.extend(this.options, options);

        this.cells = [];

        init();

    };

}