(function () {

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

    if (history.state) {
        nextLevel = history.state.levelId;
    }

    $('.all-levels').on("click", function () {
        $('.levels').show();
        $('.greeting').hide();
    });

    $('.about').on('click', function () {
        $('.levels').show();
        $('.greeting').show();
        $('.overview').show();
        $('.guide').hide();
    });
    $('.reminder').on('click', function () {
        $('.levels').show();
        $('.greeting').show();
        $('.overview').hide();
        $('.guide').show();
    });

    $('.select-level').on("click", function () {
        $(this).parent().parent().hide(); //pain
    });

    $('.cross').on('click', function () {
        $('.levels').hide();
    });

    function loadNextLevel(levels) {
        $('.container').empty();

        if (!this.levels) {
            this.levels = levels;
        }

        levels = this.levels;

        var c = 0;
        var found = false;

        $('.overlay').hide();
        for (var level in levels) {

            if (levels.hasOwnProperty(level)) {
                for (var i = 0; i < levels[level].length; i++) {
                    console.log(c, nextLevel);
                    if (c === nextLevel) {
                        if (typeof(levels[level][i]) !== 'undefined') {
                            loadLevel(levels[level][i]);
                            nextLevel = c + 1;
                            window.location.hash = c;
                            history.replaceState({'levelId': c}, "Jsrobot: level " + c);
                            found = true;
                        }
                        break;
                    }
                    c++;
                }
            }
        }
        if (!found) {
            $('.greeting').hide();
            $('.levels').show();
        }
    }

    $.get('levels/levels.json')
        .success(function (data) {

            var levels = data;

            fillLevelsDiv(levels);

            loadNextLevel(levels);

            $(window).on('hashchange', function () {
                nextLevel = +window.location.hash.substring(1);
                for (var intr in intervals) {
                    clearInterval(intervals[intr]);
                }
                loadNextLevel(levels);
            });

            $('.next').off('click').on("click", function () {
                for (var intr in intervals) {
                    clearInterval(intervals[intr]);
                }
                loadNextLevel();
            });

        });


    function loadLevel(level) {

        $('.container').empty();
        $('.error').hide();

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


        m.fillFromFile(level.map.file, function (data) {
            $('.container').empty();
            m.display();
            if (typeof(level.map.mapfunc) !== 'undefined') {
                m.append(level.map.mapfunc);
            }
            R = new Robot();
            R.assignMap(m);
            R.place();
        });

        $('.name').html("Level: " + level.name);
        $('.description').html(level.description);

        $('.before code').text(level.before);
        $('.code code').text("\n" + (level.code || '') + "\n\n");
        $('.after code').text(level.after);

        $('pre code').each(function (i, e) {
            hljs.highlightBlock(e);
        });

        $('.run').attr('disabled', false);
        $('.reload').attr('disabled', false);

        $('.run').off('click').on('click', function () {

            for (var intr in intervals) {
                clearInterval(intervals[intr]);
            }

            $('.error').hide();
            R.map.redraw();
            R.place();

            var r = new Runner({
                robot: R,
                before: level.before,
                after: level.after,
                runnerfunc: level.runnerfunc || '(function() {})'
            }, intervals);

            r.run(
                $('.code code').text()
            );

        });

        var tmr = setInterval(function () {
            if (R.finished()) {
                $('.run').attr('disabled', true);
                $('.reload').attr('disabled', true);
                $('.overlay').show();
                $('.success-wrapper').css('marginTop', $('.overlay').height() / 2 - $('.success-wrapper').height() / 2);
                for (var intr in intervals) {
                    clearInterval(intervals[intr]);
                }
                clearInterval(tmr);

                var wonLevels = JSON.parse(localStorage.getItem('wonLevels')) || [];
                if (wonLevels.indexOf(+window.location.hash.substring(1)) === -1) {
                    wonLevels.push(+window.location.hash.substring(1));
                    localStorage.setItem("wonLevels", JSON.stringify(wonLevels));
                    $('.level').each(function () {
                        if ($(this).data('levelId') == window.location.hash.substring(1)) {
                            $(this).addClass('passed');
                        }
                    });
                }


            }
        }, 200);

        $('.reload').off('click').on('click', function () {

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
            console.log('here');
            $('.levels').hide();
        }

        var lid = 0;

        var wonLevels = JSON.parse(localStorage.getItem('wonLevels')) || [];
        if (localStorage.getItem('version') !== '0.0.2') {
            var idx = wonLevels.indexOf(9);
            if (idx !== -1) {
                wonLevels.splice(idx, 1);
                localStorage.setItem("wonLevels", JSON.stringify(wonLevels));
            }
            localStorage.setItem("version", "0.0.2");
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
                for (var i = 0; i < levels[grp].length; i++) {
                    var lvl = $('<div></div>')
                        .addClass('level')
                        .data('level-id', lid)
                        .text(i + ". " + levels[grp][i].name)
                        .off('click')
                        .on('click', bindClick)
                        .appendTo(lgroup);
                    if (wonLevels.indexOf(lid) !== -1) {
                        lvl.addClass('passed');
                    }
                    lid++;
                }
            }
        }
    }

})();

function error(e, intervals, R) {
    for (var intr in intervals) {
        clearInterval(intervals[intr]);
    }

    R.map.redraw();
    R.place();

    $('.error').text(e.toString()).show();
}