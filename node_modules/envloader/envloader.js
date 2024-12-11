(function() {

    exports.load = function(relPath) {
        var path = require('path');
        var fs = require("fs");
        var envFilePath = path.resolve(path.dirname(require.main.filename), relPath || ".", ".env");
        if (fs.existsSync(envFilePath)) {
            var content = fs.readFileSync(envFilePath, "utf-8");

            var lines = content.split(/\n|\r/);

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var eq = line.indexOf("=");
                if (eq < 0) continue;

                process.env[line.substr(0, eq)] = line.substr(eq + 1);
            }
        }
    };

})();