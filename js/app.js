(function() {

    var R;
    var m;

    var levels = {};
    var currentLevel = 0;

    $.get('/levels/levels.json')
        .success(function(data) {

            var levels = data;

            var c = 0;

            function loadNextLevel() {
                $('.overlay').hide();
                for (var level in levels) {
                    if (levels.hasOwnProperty(level)) {
                        for (var i = 0; i<level.length; i++) {
                            if (c === currentLevel) {
                                if (typeof(levels[level][c])!=='undefined') {
                                    loadLevel(levels[level][c]);
                                    currentLevel = c+1;
                                }
                                break;
                            }

                            c++;
                        }
                    }
                }
            }

            loadNextLevel();

            $('.next').off('click').on("click", function() {
                loadNextLevel();
            });

        });

    function loadLevel(level) {

        if (m instanceof Map) {
            m.reload({
                width: level.map.width,
                height: level.map.height,
                map: level.map.file,
                description: level.description,
                before: level.before,
                after: level.after,
                code: level.code
            });
        } else {
            m = new Map({
                width: level.map.width,
                height: level.map.height,
                color: "green",
                backgroundColor: "black"
            });
        }

        m.fillFromFile(level.map.file, function(data) {
            m.display();
            R = new Robot();
            R.assignMap(m);
            R.place();
        });

        $('.name').html("Level: "+level.name);
        $('.description').html(level.description);

        $('.before code').text(level.before);
        $('.code code').text("\n"+level.code+"\n\n");
        $('.after code').text(level.after);

        $('pre code').each(function(i, e) {hljs.highlightBlock(e);});

        $('.run').off('click').on('click', function() {

            $('.error').hide();

            var r = new Runner({
                robot: R,
                before:
                    level.before,
                after:
                    level.after
            });

            r.run(
                $('.code code').text()
            );

        });

        var tmr = setInterval(function() {
            if (R.finished()) {
                $('.overlay').show();
                $('.success-wrapper').css('marginTop', $('.overlay').height() / 2 - $('.success-wrapper').height() / 2);
                clearInterval(tmr);
            }
        }, 200);

        $('.reload').off('click').on('click', function() {
            $('.error').hide();
            R.map.redraw();
            R.place();
        });
    }

/*    function loadTest(options) {

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

        var tmr = setInterval(function() {
            if (R.finished()) {
                $('.overlay').show();
                $('.success-wrapper').css('marginTop', $('.overlay').height() / 2 - $('.success-wrapper').height() / 2);
                clearInterval(tmr);
            }
        }, 200);

        $('.reload').on('click', function() {
            $('.error').hide();
            R.map.redraw();
            R.place();
        });

        $('.next').off('click').on("click", function() {
            //m.remove();
            $.get('/levels/levels.json')
                .success(function(levels) {
                    for (var level in levels) {
                        if (levels.hasOwnProperty(level)) {
                            console.log(level, levels[level]);
                            m.reload({
                                width: levels[level][1].map.width,
                                height: levels[level][1].map.height,
                                map: levels[level][1].map.file,
                                description: levels[level][1].description,
                                before: levels[level][1].before,
                                after: levels[level][1].after,
                                code: levels[level][1].code
                            });

                        }
                    }

                    m.fillFromFile(levels[level][1].map.file, function(data) {
                        m.display();
                        R = new Robot();
                        R.assignMap(m);
                        R.place();
                    });

                    $('.description').html(levels[level][1].description);

                    $('.before code').text(levels[level][1].before);
                    $('.code code').text("\n"+levels[level][1].code+"\n\n");
                    $('.after code').text(levels[level][1].after);

                    $('pre code').each(function(i, e) {hljs.highlightBlock(e);});

                    $('.overlay').hide();

                    var tmr = setInterval(function() {
                        if (R.finished()) {
                            $('.overlay').show();
                            $('.success-wrapper').css('marginTop', $('.overlay').height() / 2 - $('.success-wrapper').height() / 2);
                            clearInterval(tmr);
                        }
                    }, 200);

                });

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
        });*/

})();