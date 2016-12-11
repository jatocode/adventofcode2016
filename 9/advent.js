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
    var tot = 0;
    for(var l=0; l < lines.length ; l++) {
        var line = lines[l];
        var decompressed = '';

       // console.log(line);
        for(var i=0; i < line.length ; i++) {
            if(line[i] == '(') {
                // Time to decompress
                var startmark = line.substring(i);
                var regex = /(\d+)x(\d+)/;
                var match = startmark.match(regex);
                var len = parseInt(match[1]);
                var repeat = parseInt(match[2]);
                decompressed += expand(startmark, match[0].length + 2, len, repeat );

                i+= len + match[0].length + 1;
            } else {
                decompressed += line[i];
            }
        }
        console.log(decompressed + ' ' + decompressed.length);
        tot += decompressed.length;
    }
    console.log('Total:' + tot);
});

function expand(data, start, length, repeat) {
    var expanded = '';
    var decomp = data.substring(start, start + length);

    for(var i=0; i < repeat; i++) {
        expanded += decomp;
    }

    return expanded;
}
