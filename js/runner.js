function Runner(options, intervals) {
    var R = options.robot;

    var before = options.before;

    var code = "";

    var after = options.after;
    var runnerfunc = options.runnerfunc;

    this.run = function(code) {

        try {

            eval(runnerfunc);

            if (/destroy/i.test(code)) {
                throw new Error("Robot: you can't use destroy function.");
            }
            if (/R\.x|R\.y|R\[\'x|y\'\]/i.test(code)) {
                throw new Error("Robot: do you want to teleport me?");
            }
            if (/\/\/|\/\*/i.test(code)) {
                throw new Error("Robot: do you really want to place comments in such simple code?");
            }
            if (/console/i.test(code)) {
                throw new Error("Robot: I'm working on vacuum tubes. I have no console.");
            }
            if (/map/i.test(code)) {
                throw new Error("Robot: map is reserved word. You can't use it.");
            }
            //c = console;
            eval(before + code + after);
        }
        catch (e) {
            $('.error').text(e.toString()).show();
            error(e, intervals, R);
        }
    };

}