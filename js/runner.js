function Runner(options, intervals) {
    var R = options.robot;

    var before = options.before;

    var code = "";

    var after = options.after;

    this.run = function(code) {
        try {
            eval(before + code + after);
        }
        catch (e) {
            $('.error')
                .text(e.toString())
                .show();
        }
    };

}