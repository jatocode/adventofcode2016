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

    var tls = 0;
    for(var line in lines) {
        var ip7 = lines[line];

        if(ip7.length == 0) break;

        var start = 0;
        var stop = 0;
        var hstart = 0;
        var hstop = 0;
        var abbaInIP = false;
        var abbaInHypernet = false;
        for(var i=0;i<ip7.length;i++) {
            if(ip7[i] == '[') {
                hstart = i+1;
                stop = i;
                abbaInIP |= checkABBA(ip7.substring(start, stop));
            }
            if(ip7[i] == ']') {
                hstop = i;
                start = i+1;
                abbaInHypernet |= checkABBA(ip7.substring(hstart, hstop));
            }

        }
        if(start < ip7.length) {
            abbaInIP |= checkABBA(ip7.substring(start, ip7.length));
        }

        if(abbaInIP && !abbaInHypernet) {
            tls++;
        }
    }
    console.log('Number of IP that supports TLS: ' + tls);

});

function checkABBA(data) {
    if(data == null || data == undefined) return false;
    for(var j=0;j<data.length && j+3 <= data.length;j++) {

        var a = data[j] + data[j+1];
        var b = data[j+3] + data[j+2];

        if(a === b) {
            if(data[j] == data[j+1]) return false;
            if(data[j+2] == data[j+3]) return false;

            return true;
        }
    }
    return false;
}

