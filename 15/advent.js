var fs = require('fs');
var args = process.argv.slice(2);

function read(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}

read(args[0], function(data) {
    var lines = data.split("\n");

    for(var l in lines) {
        var line = lines[l];
        var regex = /Disc #(\d+) has (\d+).*time=(\d+).*position.(\d+)/;
        var hit = line.match(regex);
        if(hit) {
            console.log(hit);
        }
    }
});

