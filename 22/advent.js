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
    var nodes = [];
    for(l in lines) {
        var line = lines[l];
        var regex = /node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)/;
        var match = line.match(regex);
        if(match) {
            var node = { x: match[1],
                     y: match[2],
                     size: match[3],
                     used: match[4],
                     avail: match[5],
                     use: match[6]
            };
            nodes.push(node);
        }
    }
    console.log(nodes);
});
