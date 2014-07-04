var fs = require('fs');

function JSRL() {

    this.level = {
        map: {}
    };
    var rgx = /<(.*)>((?:\r|\n|.)*)<\/\1>/gm;

    this.load = function(filename) {
        try {
            var file = fs.readFileSync(filename, {encoding: 'utf-8'});

            var match;

            while ( (match = rgx.exec(file)) !== null) {
                if (match[1].match(/\./)) {
                    this.level.map[match[1].slice(4)] = match[2].replace(/(?:\r\n)/g, '\n');
                } else {
                    this.level[match[1]] = match[2].replace(/(?:\r\n)/g, '\n');
                }
            }

            console.log(this.level);

            return true;
        } catch (e) {
            return false;
        }
        return false;
    };

    this.prepare = function() {
        this.level.map.file = 'levels/maps/' + this.level.map.file;
        for (var l in this.level) {
            if (this.level[l] === 'undefined') {
                this.level[l] = '';
            }
        }
        fs.writeFileSync(this.level.map.file, this.level.map.mapcontent);
    };

    this.write = function() {
        this.prepare();
        var len = this.level.length;

        var json = JSON.stringify(this.level);
        var levels = fs.readFileSync('levels/levels.json', {encoding: 'utf-8'});

        levels = JSON.parse(levels);

        var pushed = false;

        if (typeof(levels[this.level.group]) === 'undefined') {
            levels[this.level.group] = [];
        }

        for (var lev in levels[this.level.group]) {
            if (levels[this.level.group][lev].name === this.level.name) {
                levels[this.level.group][lev] = this.level;
                pushed = true;
                break;
            }
        }

        if(!pushed) {
            levels[this.level.group].push(this.level);
        }

        fs.writeFileSync('levels/levels.json', JSON.stringify(levels));

        return true;

    };

}

module.exports = JSRL;