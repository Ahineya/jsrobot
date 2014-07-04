var dim = {
    x: 5,
    y: 5
};

var map;

describe("1 Map", function() {
    describe("1.1 Init", function() {
        var map = new Map({
            width: dim.x,
            height: dim.y
        });

        it("1.1.1 should create object", function() {
            chai.assert(typeof(map) === "object", "Map didn't created");
        });

        it("1.1.2 should create default options object", function() {
            chai.assert(map.options && typeof(map.options) === 'object', "map options object didn't created");
            chai.assert(map.options.container === ".container", "default container isn't .container");
            chai.assert(map.options.wrapperClass === "map-wrapper", "default wrapperClass isn't .map-wrapper");
            chai.assert(map.options.columnClass === "map-column", "default columnClass isn't .map-column");
            chai.assert(map.options.rowClass === "map-row", "default rowClass isn't .map-row");
            chai.assert(map.options.cellClass === "map-cell", "default cellClass isn't .map-cell");
            chai.assert(map.options.cellSize === 20, "default cellSize isn't 20");
        });

        it("1.1.3 should initialize map width and height", function() {
            chai.assert((map.options.width === dim.x) && (map.options.height === dim.y), "Map dimensions didn't initialized");
        });
        it("1.1.4 should create cells", function() {
            chai.assert(map.cells && typeof(map.cells) === 'object', "Map cells didn't created");
            chai.assert(map.cells.length === dim.x, "Map cells object didn't have correct width");
            chai.assert(map.cells[0].length === dim.y, "Map cells object didn't have correct height");
            chai.assert(typeof(map.cells[0][0]) === "object", "Map cell objects didn't created");
            chai.assert(
                    map.cells[0][0].symbol === " " &&
                    map.cells[0][0].type === "space" &&
                    map.cells[0][0].color === "black" &&
                    map.cells[0][0].backgroundColor === "white",
                "Map cell object's didn't created correctly"
            );
        });

        describe("1.1.5 should create new testable object", function() {
            map1 = new Map({
                width: dim.x,
                height: dim.y,
                container: ".con",
                wrapperClass: "wrapper",
                columnClass: "column",
                rowClass: "row",
                cellClass: "cell",
                cellSize: 25
            });

            it("1.1.5.1 should fill object with options", function() {
                chai.assert(map1.options && typeof(map.options) === 'object', "map options object didn't created");
                chai.assert(map1.options.container === ".con", "options container isn't .con");
                chai.assert(map1.options.wrapperClass === "wrapper", "options wrapperClass isn't .wrapper");
                chai.assert(map1.options.columnClass === "column", "options container isn't .column");
                chai.assert(map1.options.rowClass === "row", "options container isn't .row");
                chai.assert(map1.options.cellClass === "cell", "options container isn't .cell");
                chai.assert(map1.options.cellSize === 25, "options cellSize isn't 25");
            });
        });

    });

    describe("1.2 Filling", function() {
        it("1.2.1 should fill map from string", function() {

            var map2 = new Map({
                width: dim.x,
                height: dim.height
            });
            map2.fillFromString("######   ## _ ##  f######", "green", "black");

            chai.assert(
                    map2.cells[0][0].type === "wall" &&
                    map2.cells[0][0].symbol === "#" &&
                    map2.cells[0][0].color === "green" &&
                    map2.cells[0][0].backgroundColor === "black",
                "Map cells didn't correctly filled from string [wall]"
            );
            chai.assert(
                    map2.cells[1][1].type === "space" &&
                    map2.cells[1][1].symbol === " ",
                "Map cells didn't correctly filled from string [space]"
            );
            chai.assert(
                    map2.cells[2][2].type === "start" &&
                    map2.cells[2][2].symbol === "_",
                "Map cells didn't correctly filled from string [start]"
            );
            chai.assert(
                    map2.cells[3][3].type === "finish" &&
                    map2.cells[3][3].symbol === "f",
                "Map cells didn't correctly filled from string [finish]"
            );
        });

        it("1.2.2 should fill map from file", function() {
            var map = new Map(5,5);
            map.fillFromFile("maps/test.map", function() {
                chai.assert(
                        map.cells[0][0].type === "wall" &&
                        map.cells[0][0].symbol === "#" &&
                        map.cells[0][0].color === "green" &&
                        map.cells[0][0].backgroundColor === "black",
                    "Map cells didn't correctly filled from string [wall]"
                );

                chai.assert(
                        map.cells[1][1].type === "space" &&
                        map.cells[0][0].symbol === " ",
                    "Map cells didn't correctly filled from string [space]"
                );
                chai.assert(
                        map.cells[2][2].type === "start" &&
                        map.cells[2][2].symbol === "_",
                    "Map cells didn't correctly filled from string [start]"
                );
                chai.assert(
                        map.cells[3][3].type === "finish" &&
                        map.cells[3][3].symbol === "f",
                    "Map cells didn't correctly filled from string [finish]"
                );

                done();

            });

        });

    });

    describe("1.3 Building HTML", function() {

        map = new Map({
            width: dim.x,
            height: dim.y,
            container: ".container",
            wrapperClass: "map-wrapper",
            columnClass: "column",
            rowClass: "row",
            cellClass: "cell"
        });
        map.fillFromString("######   ## _ ##  f######", "green", "black");
        map.display();

        it("1.3.1 should build correct layout for map", function() {
            chai.assert(
                    $(map.options.container + ">." + map.options.wrapperClass).length === 1,
                "Map wrapper didn't created correctly"
            );
            chai.assert(
                    $(map.options.container + ">." + map.options.wrapperClass + " ." + map.options.rowClass + '-0').length ===
                    map.options.height,
                "created rows count is invalid"
            );
            chai.assert(
                    $(map.options.container + ">." + map.options.wrapperClass + " ." + map.options.columnClass + '-0').length ===
                    map.options.width,
                "created columns count is invalid"
            );
            chai.assert(
                    $(map.options.container + ">." + map.options.wrapperClass + " ." + map.options.cellClass).length ===
                    map.options.width * map.options.height,
                "created cells count is invalid"
            );
            chai.assert(
                    $(map.options.container + '>.' + map.options.wrapperClass).width() ===
                    map.options.width * map.options.cellSize + 2,
                "wrapper width isn't correct"
            );
        });

        it("1.3.2 should correctly draw map", function() {
            chai.assert(
                    $(map.options.container + '>.' + map.options.wrapperClass + ' .' + map.options.columnClass + '-0')
                        .eq(0)
                        .text() === '#' &&
                    $(map.options.container + '>.' + map.options.wrapperClass + ' .' + map.options.columnClass + '-0')
                        .eq(0)
                        .css('color') === 'rgb(0, 128, 0)' &&
                    $(map.options.container + '>.' + map.options.wrapperClass + ' .' + map.options.columnClass + '-0')
                        .eq(0)
                        .css('backgroundColor') === 'rgb(0, 0, 0)',
                "[0][0] cell isn't drawn properly"
            );

            chai.assert(
                    $(map.options.container + '>.' + map.options.wrapperClass + ' .' + map.options.columnClass + '-2')
                        .eq(2)
                        .text() === "_" &&
                    $(map.options.container + '>.' + map.options.wrapperClass + ' .' + map.options.columnClass + '-2')
                        .eq(2)
                        .css('color') === 'rgb(0, 128, 0)' &&
                    $(map.options.container + '>.' + map.options.wrapperClass + ' .' + map.options.columnClass + '-2')
                        .eq(2)
                        .css('backgroundColor') === 'rgb(0, 0, 0)',
                "[2][2] cell isn't drawn properly"
            );
        });

        it('1.3.3 should assign layout to map.cells object', function() {
            chai.assert(
                    map.cells[0][0].view[0] ===
                    $(map.options.container + '>.' + map.options.wrapperClass + ' .' + map.options.columnClass + '-0')
                        .eq(0)[0],
                "view isn't assigned to cell [0][0]"
            );
        });

        it('1.3.4 should redraw itself', function() {
            var m = new Map({
                width: 5,
                height: 5,
                container: ".c1",
                wrapperClass: "m1",
                columnClass: "c2",
                rowClass: "r1",
                cellClass: "c3"
            });

            m.fillFromString("######   ## _ ##  f######", "green", "black");
            m.display();

            m.redraw();

            var result = true;

            for (var y = 0; y < m.options.height; y++) {
                for(var x = 0; x < m.options.width; x++) {
                    if (m.cells[x][y].view.text() === m.cells[x][y].symbol) {
                        result = false;
                    }
                }
            }

            chai.assert(result, "Mapincorrectly redrawed");

        });

    });

});


var rmap = new Map({
    width: dim.x,
    height: dim.y,
    container: ".container",
    wrapperClass: "r-map-wrapper",
    columnClass: "column",
    rowClass: "row",
    cellClass: "cell"
});

rmap.fillFromString("######   ## _ ##  f######", "green", "black");
rmap.display();

describe('2 Robot', function() {
    describe('2.1 Creating abstract robot', function() {
        var R = new Robot();
        it('2.2.1 should create robot object', function() {
            chai.assert( (typeof(R) === 'object') && (R instanceof Robot), "Robot didn't created");
        });

        R.assignMap(rmap);

        it('2.2.2 should assign a map to robot', function() {
            chai.assert(R.map && (R.map instanceof Map), "Map didn't assigned");
        });

        it('2.2.3 should have a robot face', function() {
            chai.assert(R.face === '☺', "Robot has no face");
        });

        it('2.2.4 should have coordinates', function() {
            chai.assert(R.x === 0, "Robot doesn't have x coordinate");
            chai.assert(R.y === 0, "Robot doesn't have y coordinate");
        });

        it('2.2.5 should have finished function', function() {
            chai.assert(R.finished() === false, "Robot finished value is not false");
        });

    });

    describe('2.2 Robot actions', function() {
        var R = new Robot();
        R.assignMap(rmap);
        R.place();

        it('2.2.1 should be placed on map', function(){
            chai.assert((R.x === 2) && (R.y === 2), 'Robot incorrectly placed');
            chai.assert(
                    $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass +'-2')
                        .eq(2).text() === R.face,
                "Robot incorrectly drawn"
            );
        });

        it('2.2.2 should have walk method', function() {
            chai.assert(R.walk, "walk function isn't present");
        });

        describe('2.2.3 Walking', function() {

            it('2.2.3.1 Should walk up', function() {
                var tempY = R.y;
                chai.assert(R.walk('up'), "Didn't exec walk function");
                chai.assert(R.y === tempY - 1, "Didn't change coordinate");
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + R.x)
                            .eq(tempY).text() === R.map.cells[R.x][tempY].symbol,
                    "Map didn't restore symbol at old robot place"
                );
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + R.x)
                            .eq(R.y).text() !== R.map.cells[R.x][R.y].symbol,
                    "Robot didn't change view"
                );
            });

            it('2.2.3.2 Should walk left', function() {
                var tempX = R.x;
                chai.assert(R.walk('left'), "Didn't exec walk function");
                chai.assert(R.y === tempX - 1, "Didn't change coordinate");
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + (tempX))
                            .eq(R.y).text() === R.map.cells[tempX][R.y].symbol,
                    "Map didn't restore symbol at old robot place"
                );
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + (R.x))
                            .eq(R.y).text() !== R.map.cells[R.x][R.y].symbol,
                    "Robot didn't change view"
                );
            });

            it('2.2.3.3 Should walk down', function() {
                var tempY = R.y;
                chai.assert(R.walk('down'), "Didn't exec walk function");
                chai.assert(R.y === tempY + 1, "Didn't change coordinate");
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + (R.x))
                            .eq(tempY).text() === R.map.cells[R.x][tempY].symbol,
                    "Map didn't restore symbol at old robot place"
                );
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + (R.x))
                            .eq(R.y).text() !== R.map.cells[R.x][R.y].symbol,
                    "Robot didn't change view"
                );
            });

            it('2.2.3.4 Should walk right', function() {
                var tempX = R.x;
                chai.assert(R.walk('right'), "Didn't exec walk function");
                chai.assert(R.y === tempX + 1, "Didn't change coordinate");
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + (tempX))
                            .eq(R.y).text() === R.map.cells[tempX][R.y].symbol,
                    "Map didn't restore symbol at old robot place"
                );
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + (R.x))
                            .eq(R.y).text() !== R.map.cells[R.x][R.y].symbol,
                    "Robot didn't change view"
                );
            });

            it("2.2.3.5 Shouldn't go to walls", function() {
                R.walk('right');

                var tempX = R.x;
                var tempY = R.y;

                chai.assert(!R.right(), "Robot: can't go into the wall");

                chai.assert((tempX === R.x) && (tempY === R.y), "Robot coordinates changed");
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + (tempX + 1))
                            .eq(R.y).text() === R.map.cells[tempX + 1][R.y].symbol,
                    "Map wall isn't in it's place"
                );

                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + (tempX + 1))
                            .eq(tempY).text() === R.map.cells[R.x + 1][R.y].symbol,
                    "Robot changed view"
                );

            });

            it("2.2.3.6 Should correctly work with finish", function() {
                chai.assert(!R.finished(), "Robot thinks he finished on non-finish cell");
                R.walk('down');
                chai.assert(R.finished(), "Robot think's he didn't finished on finish cell");
            });

        });

        describe("2.2.4 Map manipulating", function() {
            it("2.2.4.1 should destroy the wall", function() {
                R.destroy('right');
                chai.assert(
                        $(R.map.options.container + '>.' + R.map.options.wrapperClass + ' .' + R.map.options.columnClass + '-' + (R.x + 1))
                            .eq(R.y).text() === " ",
                    "Robot didin't destroyed a wall"
                );

            });
            it("2.2.4.2 should recognize floor symbol", function() {
                chai.assert(R.standingOn('f'), "Robot didn't recognize floor");
            });
            it("2.2.4.2 should recognize floor symbol", function() {
                chai.assert(R.standingOn() === 'f', "Robot didn't recognize floor");
            });
        });

        describe("2.2.5 Other actions", function() {
            it("2.2.4.3 should die", function() {
                chai.assert.throws(R.die, Error, "Robot has died.");
            });
        });


    });

});