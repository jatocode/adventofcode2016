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

var nodes = [];
read(args[0], function(data) {
    var lines = data.split("\n");
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
    console.log(getNode(1,1));

    // Build tree with searchfunction of neigbours?

});

function getNode(x,y) {
    for(i in nodes) {
        if(nodes[i].x == x && nodes[i].y == y) {
            return nodes[i];
        }
    }
}
    
function viablePair(nodea, nodeb) {
    if(nodea.avail == 0) {
        return false;
    }

    if(nodea.used < nodeb.avail) {
        return true;
    }
}
