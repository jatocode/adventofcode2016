var fs = require('fs');
var args = process.argv.slice(2);

var display;

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
    for(var i in lines) {
        var line = lines[i];

        if(line.length == 0) break;
        var regex = /((\d+)x(\d+))/g
        var matches = [];
        var markers = [];

        while ((matches = regex.exec(line)) !== null) {
            var d = { length: parseInt(matches[2]), 
                      repeats: parseInt(matches[3]), 
                      i: parseInt(matches.index) + parseInt(matches[0].length) +1 };
            markers.push(d);
        }

        var expanded = '';
        for(i in markers) {
            var mark = markers[i];
            if(i > 0) {
                
            }
            console.log(expand(line, mark));
        }
    }

});

function expand(data, mark) {
    var expanded = '';
    var start = mark.i;
    var end = start + mark.length;
    var repeats = mark.repeats;
    var decomp = data.substring(start, end);

    expanded = decomp;

    return expanded;
}
