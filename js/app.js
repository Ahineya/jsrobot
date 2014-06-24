(function() {

    var R;
    var m;

    var levels = {};
    var nextLevel = 0;

    var intervals = [];

    if (window.location.hash !== '') {
        nextLevel = +window.location.hash.substring(1);
    } else {
        $('.levels').show();
    }

    $('.all-levels').on("click", function() {
        $('.levels').show();
        $('.greeting').hide();
    });

    $('.about').on('click', function() {
        $('.levels').show();
        $('.greeting').show();
    });

    $('.select-level').on("click", function() {
        $(this).parent().parent().hide(); //pain
    });

    $('.cross').on('click', function() {
        $('.levels').hide();
    });

    function loadNextLevel(levels) {

        if (!this.levels) {
            this.levels = levels;
        }

        levels = this.levels;

        var c = 0;

        $('.overlay').hide();
        for (var level in levels) {
            if (levels.hasOwnProperty(level)) {
                for (var i = 0; i<level.length; i++) {
                    if (c === nextLevel) {
                        if (typeof(levels[level][c])!=='undefined') {
                            loadLevel(levels[level][c]);
                            nextLevel = c+1;
                            window.location.hash = c;
                        }
                        break;
                    }

                    c++;
                }
            }
        }
    }

    $.get('/levels/levels.json')
        .success(function(data) {

            var levels = data;

            fillLevelsDiv(levels);

            loadNextLevel(levels);

            $(window).on('hashchange', function() {
                nextLevel = +window.location.hash.substring(1);
                loadNextLevel(levels);
            });

            $('.next').off('click').on("click", function() {
                for (var intr in intervals) {
                    clearInterval(intervals[intr]);
                }
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

            $('.container').empty();

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

            for (var intr in intervals) {
                clearInterval(intervals[intr]);
            }

            $('.error').hide();

            var r = new Runner({
                robot: R,
                before:
                    level.before,
                after:
                    level.after
            }, intervals);

            r.run(
                $('.code code').text()
            );

        });

        var tmr = setInterval(function() {
            if (R.finished()) {
                $('.overlay').show();
                $('.success-wrapper').css('marginTop', $('.overlay').height() / 2 - $('.success-wrapper').height() / 2);
                for (var intr in intervals) {
                    clearInterval(intervals[intr]);
                }
                clearInterval(tmr);
            }
        }, 200);

        $('.reload').off('click').on('click', function() {

            for (var intr in intervals) {
                clearInterval(intervals[intr]);
            }

            $('.error').hide();
            R.map.redraw();
            R.place();
        });
    }

    function fillLevelsDiv(levels) {

        function bindClick(i) {
            var lid = $(this).data('level-id');
            window.location.hash = '#' + lid;
            $('.levels').hide();
        }

        for (var grp in levels) {

            var lgroup = $('<div></div>')
                .addClass('level-group')
                .appendTo($('.levels .levels-wrapper'));

            $('<div></div>')
                .addClass('level-name')
                .text(grp)
                .appendTo(lgroup);

            if (levels.hasOwnProperty(grp)) {
                for (var i = 0; i<levels[grp].length; i++) {
                    $('<div></div>')
                        .addClass('level')
                        .data('level-id', i)
                        .text(i + ". " + levels[grp][i].name)
                        .on('click', bindClick)
                        .appendTo(lgroup);
                }
            }
        }
    }

})();