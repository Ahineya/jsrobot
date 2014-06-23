(function() {

    var R;

    function loadTest(options) {

        var m = new Map({
            width: options.width,
            height: options.height,
            color: "green",
            backgroundColor: "black"
        });

        m.fillFromFile(options.map, function(data) {
            m.display();
            R = new Robot();
            R.assignMap(m);
            R.place();
        });

        $('.description').html(options.description);

        $('.before code').text(options.before);
        $('.code code').text("\n"+options.code+"\n\n");
        $('.after code').text(options.after);

        $('pre code').each(function(i, e) {hljs.highlightBlock(e);});

        $('.run').off('click').on('click', function() {

            $('.error').hide();

            var r = new Runner({
                robot: R,
                before:
                    options.before,
                after:
                    options.after
            });

            r.run(
                $('.code code').text()
            );

        });

        $('.reload').on('click', function() {
            $('.error').hide();
            R.map.redraw();
            R.place();
        });
    }

    $.get('/levels/levels.json')
        .success(function(levels) {
            for (var level in levels) {
                if (levels.hasOwnProperty(level)) {
                    console.log(level, levels[level]);
                    loadTest({
                        width: levels[level][0].map.width,
                        height: levels[level][0].map.height,
                        map: levels[level][0].map.file,
                        description: levels[level][0].description,
                        before: levels[level][0].before,
                        after: levels[level][0].after,
                        code: levels[level][0].code
                    });
                }
            }
        });

})();