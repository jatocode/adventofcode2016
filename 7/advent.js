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

    var ssl = 0;
    var tls = 0;
    for(var line in lines) {
        var ip7 = lines[line];

        if(ip7.length == 0) break;

        var start = 0;
        var stop = 0;
        var hstart = 0;
        var hstop = 0;
        var abbaSuperset = false;
        var abbaHypernet = false;
        for(var i=0;i<ip7.length;i++) {
            if(ip7[i] == '[') {
                hstart = i+1;
                stop = i;
                abbaSuperset |= checkABBA(ip7.substring(start, stop));
            }
            if(ip7[i] == ']') {
                hstop = i;
                start = i+1;
                abbaHypernet |= checkABBA(ip7.substring(hstart, hstop));
            }

        }
        if(start < ip7.length) {
            abbaSuperset |= checkABBA(ip7.substring(start, ip7.length));
        }

        if(abbaSuperset && !abbaHypernet) {
            tls++;
        }

        // Part 2
        var superset = [];
        start = stop = hstart = hstop = 0;
        for(var i=0;i<ip7.length;i++) {
            if(ip7[i] == '[') {
                stop = i;
                var aba = checkABA(ip7.substring(start, stop));
                if(aba.length > 0) {
                    superset = superset.concat(aba);
                }   
            }
            if(ip7[i] == ']') {
                start = i+1;
            }
        }
        if(start < ip7.length) {
            var aba = checkABA(ip7.substring(start, ip7.length+1));
            if(aba.length > 0) {
                superset = superset.concat(aba);
            }
        }

        start = stop = hstart = hstop = 0;
        var sslFound = false;
        for(var i=0;i<ip7.length;i++) {
            if(ip7[i] == '[') {
                hstart = i+1;
            }
            if(ip7[i] == ']') {
                hstop = i;
                for(a in superset) {
                    var aba = superset[a];
                    if(checkBAB(ip7.substring(hstart,hstop), aba)) {
                        sslFound = true;
                    }
                }
            }
        }
        if(sslFound) {
            ssl++;
        }
    }
    console.log('Number of IP that supports SSL: ' + ssl );
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

function checkABA(data) {
    if(data == null || data == undefined) return [];
    var aba = [];
    for(var j=0;j<data.length && j+2 < data.length;j++) {
        if((data[j] == data[j+2]) && (data[j] != data[j+1])) {
            aba.push(data[j]+data[j+1]+data[j+2]);
        }
    }
    return aba; 
}

function checkBAB(data, aba) {
    if(data == null || data == undefined) return false
        for(var j=0;j<data.length && j+2 < data.length;j++) {
            var bab = data[j] + data[j+1] + data[j+2];
            var caba = aba[1] + aba[0] + aba[1];
            if(bab === caba) {
                return true;
            }
        }
    return false
}
