function Robot() {

    var self = this;

    this.map = {};

    this.face = "☺";

    this.x = 0;
    this.y = 0;

    this.assignMap = function(map) {
        this.map = map;
    };

    this.place = function() {

        var br = false;
        for (var y = 0; y < self.map.options.height; y++) {
            if (br) {
                break;
            }
            for(var x = 0; x < self.map.options.width; x++) {
                if (self.map.cells[x][y].type === 'start') {
                    br = true;
                    self.x = x;
                    self.y = y;
                    self.map.cells[x][y].view.text(self.face);
                    break;
                }


            }
        }
    };

    this.walk = function(direction) {

        self
            .map
            .cells[self.x][self.y]
            .view
            .text(
                self
                    .map
                    .cells[self.x][self.y]
                    .symbol
        );

        var newX = self.x;
        var newY = self.y;

        direction = direction.toLowerCase();

        switch(direction) {
            case 'up':
                newY--;
                break;
            case 'right':
                newX++;
                break;
            case 'down':
                newY++;
                break;
            case 'left':
                newX--;
                break;
            default:
                self
                    .map
                    .cells[self.x][self.y]
                    .view.text(self.face);
                throw new Error("Robot: can't move there");
        }

        if (self
            .map
            .cells[newX][newY]
            .type !== 'wall'
            ) {
                this.x = newX;
                this.y = newY;

                self
                    .map
                    .cells[self.x][self.y]
                    .view.text(self.face);
            return true;
        } else {
            self
                .map
                .cells[self.x][self.y]
                .view.text(self.face);
                return false;
            //throw new Error("Robot: can't go into the wall");
            //return false;
        }

    };

    this.destroy = function(direction) {

        var newX = self.x;
        var newY = self.y;

        switch(direction) {
            case 'up':
                newY--;
                break;
            case 'right':
                newX++;
                break;
            case 'down':
                newY++;
                break;
            case 'left':
                newX--;
                break;
        }

        if (self.map.cells[newX][newY].type==='wall') {
            self.map.cells[newX][newY].type='space';
            self.map.cells[newX][newY].symbol=' ';
            self.map.cells[newX][newY].view.text(' ');
        }
    };

    this.standingOn = function(symbol) {
        if (typeof(symbol) !== 'undefined') {
            return self.map.cells[self.x][self.y].symbol === symbol;
        } else {
            return self.map.cells[self.x][self.y].symbol;
        }
    };

    this.stayingOn = this.standingOn;

    this.die = function() {
        throw new Error('Robot has died.');
    };

    this.finished = function() {
        return self
            .map
            .cells[self.x][self.y]
            .type === 'finish';
    };

    this.move = this.walk;

    this.left = function() {
        return self.move('left');
    };
    this.right = function() {
        return self.move('right');
    };
    this.down = function() {
        return self.move('down');
    };
    this.up = function() {
        return self.move('up');
    };

}