function Runner(options, intervals) {
    var R = options.robot;

    var before = options.before;

    var code = "";

    var after = options.after;

    this.run = function(code) {

        //if ()

        try {
            if (/destroy/i.test(code)) {
                throw new Error("Robot: you can't use destroy function.");
            }
            if (/console/i.test(code)) {
                throw new Error("Robot: you can't use console.");
            }
            if (/map/i.test(code)) {
                throw new Error("Robot: map is reserved word. You can't use it.");
            }
            eval(before + code + after);
        }
        catch (e) {
            $('.error')
                .text(e.toString())
                .show();
        }
    };

}