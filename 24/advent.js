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
        
    }

});


function find(root, end, maxSteps) {
    var Q = [];
    var V = [];
    root.distance = 0;

    Q.push(root);
    var steps = 0;
    while(Q.length > 0 && steps++<maxSteps) {
        var current = Q.shift();
        console.log(current);
        if(current.x == end.x && current.y == end.y) {
            console.log('Nature finds a way');
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
            console.log('Testing ' + nx + ' ' + ny);
            if(nx >= 0 && ny >= 0 && viablePair(current, getNode(nx, ny))) {   
                console.log('Viable?');          
                if(n.distance == undefined ) {
                    n.distance = current.distance + 1;
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