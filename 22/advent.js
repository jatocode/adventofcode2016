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
var Q = [];
var V = [];

read(args[0], function(data) {
    var lines = data.split("\n");
    var id = 0;
    var maxx = 0;
    var maxy = 0;
    for(l in lines) {
        var line = lines[l];
        var regex = /node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)/;
        var match = line.match(regex);
        if(match) {
            var x = parseInt(match[1]);
            var y = parseInt(match[2]);
            var node = { id: id++,
                     x: x,
                     y: y,
                     size: parseInt(match[3]),
                     used: parseInt(match[4]),
                     avail: parseInt(match[5]),
                     use: parseInt(match[6])
            };
            nodes.push(node);
            if(x > maxx) maxx = x;
            if(y > maxy) maxy = y;
        }
    }

   // console.log(nodes);
    // for(var y=0;y<=maxy;y++) {
    //     for(var x=0;x<=maxx;x++) {
    //         find(getNode(x,y), nodes.length, 5000);
    //     }
    // }

    var viable = 0;
    for(n1 in nodes) {
        for(n2 in nodes) {
            if(viablePair(nodes[n1], nodes[n2])) {
                viable++;
            }
        }
    }
    console.log('Number of viable pairs: ' + viable);

});

function getNode(x,y) {
    for(i in nodes) {
        if(nodes[i].x == x && nodes[i].y == y) {
            return nodes[i];
        }
    }
}
    
function viablePair(nodea, nodeb) {
    //console.log(JSON.stringify(nodea) + ' ' + JSON.stringify(nodeb));
    if(nodea == undefined || nodeb == undefined) {
        return false;
    }
    if(nodea.id == nodeb.id) {
        return false;
    }

    if(nodea.used == 0) {
        return false;
    }

    if(nodea.used < nodeb.avail) {
        return true;
    }
}

function find(root, numNodes, maxSteps) {

    root.distance = 0;

    Q.push(root);
    var steps = 0;
    while(Q.length > 0 && steps++<maxSteps) {
       // console.log(V.length + ' ' + numNodes);
        var current = Q.shift();
        if(V.length == numNodes) {
            //console.log(V);
            console.log('Finished with graph');
            break;
        }

        if(inQueue(current, V)) {
            // Already visited
            continue;
        }
        V.push(current);
        var neighb = [ 
                      {xy:[current.x,   current.y + 1] },
                      {xy:[current.x,   current.y - 1] },
                      {xy:[current.x + 1, current.y]  },
                      {xy:[current.x - 1, current.y]  }
        ];

        for(i in neighb) {
            var n = neighb[i];
            var nx = n.xy[0];
            var ny = n.xy[1];

            if(inQueue(n, Q)) {
                continue;
            }
            if(nx >= 0 && ny >= 0 && viablePair(current, getNode(nx, ny))) {             
                if(n.distance == undefined ) {
                    n.parent = current;
                    Q.push(n);
                }
            }
        }
    }
    if(steps > maxSteps) {
        console.log('Number of visited: ' + V.length);
    }
    // console.log('Not found after ' + steps);
    return -1;
}

function inQueue(v, V) {
    for(i in V) {
        if(V[i].x == v.x && V[i].y == v.y) {
            return V[i];
        }
    }
    return 0;
}