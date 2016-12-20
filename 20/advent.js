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

    var ranges = [];
    var ends= [];
    var starts = [];
    for(var l=0; l < lines.length ; l++) {
        var line = lines[l];
        var range = line.match(/(\d+)-(\d+)/);
        if(range) {
            var range = {start:parseInt(range[1]), end:parseInt(range[2])};
            ranges.push(range);
            starts.push(range.start);
            ends.push(range.end);
        }
    }
    ranges.sort(function(a,b) {
        return a.start - b.start;
    });

    var range = 0;
    var ip = 0;
    var n = 0;
    var lowest = 0;
    var whitelisted = 0;
    for(r in ranges) {
        var start = ranges[r].start;
        var end = ranges[r].end;
        console.log(n + ' ' + start + ' ' + end + ' ' + lowest);
        if(n < start) {
            if(lowest == 0) {
                lowest = n;
                //break; // Found it
            }
            whitelisted += (start - n);
            console.log(whitelisted);
        }
        if(n <= end) {
            n = end + 1;
        }
    }
    console.log(n);
    console.log(whitelisted);
    whitelisted += (4294967296 - n);
    console.log(lowest);
    console.log(whitelisted);
});