function Map(options) {

    var self = this;

    var SYMBOL_TYPES = {
        '#': 'wall',
        'space': 'space',
        '_': 'start',
        'f': 'finish'
    };

    this.options = {
        width: options.width || 5,
        height: options.height || 5,
        container: options.container || ".container",
        wrapperClass: options.wrapperClass || "map-wrapper",
        columnClass: options.columnClass || "map-column",
        rowClass: options.rowClass || "map-row",
        cellClass: options.cellClass || "map-cell",
        cellSize: options.cellSize || 20
    };

    this.cells = [];

    for (var y = 0; y < this.options.height; y++) {
        for(var x = 0; x < this.options.width; x++) {
            if (typeof(this.cells[x]) === 'undefined') {
                this.cells[x] = [];
            }
            this.cells[x][y] = {
                symbol: " ",
                type: "space",
                color: "black",
                backgroundColor: "white"
            };
        }
    }

    this.fillFromString = function(mapStr, color, backColor) {

        var len = mapStr.length;
        var current = 0;

        for (var y = 0; y < this.options.height; y++) {
            for(var x = 0; x < this.options.width; x++) {
                if (typeof(this.cells[x]) === 'undefined') {
                    this.cells[x] = [];
                }
                this.cells[x][y] = {
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

    this.redraw = function() {
        for (var y = 0; y < this.options.height; y++) {
            for(var x = 0; x < this.options.width; x++) {

                self.cells[x][y].view.text(self.cells[x][y].symbol);

            }
        }
    };

}