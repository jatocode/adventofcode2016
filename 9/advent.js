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
    var total = 0;
    for(var i in lines) {
        var line = lines[i];

        if(line.length == 0) break;
        var regex = /((\d+)x(\d+))/g
        var matches = [];
        var markers = [];

        while ((matches = regex.exec(line)) !== null) {
            var d = { length: parseInt(matches[2]), 
                repeats: parseInt(matches[3]), 
                start1:  parseInt(matches.index) - 1,
                mlen: matches[0].length + 2,
                start: parseInt(matches.index) + parseInt(matches[0].length) +1 };

            markers.push(d);
        }

        var expanded = '';
        var index = 0;
        var end = 0;
        var len = 0;
        var mlen = 0;
        for(i in markers) {
            var mark = markers[i];
            var exp = '';
            //console.log(mark);
            if(i == 0) {
                exp = expand(line, mark);
                expanded += line.substring(index, mark.start1) + exp;
                index += mark.start1 + mark.mlen + mark.length;
            } else if(mark.start > markers[i-1].start + markers[i-1].length){
                exp = expand(line, mark);
                expanded += line.substring(index, mark.start1) + exp;
                index += mark.start1 + mark.mlen+ mark.length;
            }
            end = mark.start1;
            len = mark.length;
            mlen = mark.mlen;
        }
        expanded += line.substring(end+len+mlen);
        total += expanded.length;
        console.log(expanded + ' ' + expanded.length);
    }
    console.log('Total length: ' + total);

});

function expand(data, mark) {
    var expanded = '';
    var start = mark.start;
    var end = start + mark.length;
    var repeats = mark.repeats;
    var decomp = data.substring(start, end);

    for(var i=0; i < repeats; i++) {
        expanded += decomp;
    }

    return expanded;
}
