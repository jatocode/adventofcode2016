var fs = require('fs');
var args = process.argv.slice(2);

var floors = new Array(4);
var hiss = 1;
var steps = 0;

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

    
    for(var l=0; l < lines.length ; l++) {
        var line = lines[l];
        floors[l] = parseFloor(line);
    }

   // console.log(JSON.stringify(floors));
   displayFloors(4);

});

function breadthFirst(root, end, maxSteps) {

    destx = end[0];
    desty = end[1];

    var Q = [];
    var V = [];
    root.distance = 0;

    Q.push(root);
    var steps = 0;
    while(Q.length > 0 && steps++<maxSteps) {
        var current = Q.shift();
        if(current.xy[0] == destx && current.xy[1] == desty) {
            // Found destination. Backtrace!
            var path = [];
            while(current.parent != undefined) {
                path.push(current);
                current = inQueue(current.parent, V);
            }
            return path.length;
        }

        if(inQueue(current, V)) {
            // Already visited
            continue;
        }
        V.push(current);
        var neighb = [ 
                      {xy:[current.xy[0],   current.xy[1]+1] },
                      {xy:[current.xy[0],   current.xy[1]-1] },
                      {xy:[current.xy[0]+1, current.xy[1]]   },
                      {xy:[current.xy[0]-1, current.xy[1]],  },
        ];

        for(i in neighb) {
            var n = neighb[i];
            var nx = n.xy[0];
            var ny = n.xy[1];
 
            if(inQueue(n, Q)) {
                continue;
            }
            if(nx >= 0 && ny >= 0 && possibleCombo(nx, ny)) {             
                if(n.distance == undefined ) {
                    n.distance = current.distance + 1;
                    n.parent = {xy:[current.xy[0], current.xy[1]], distance:current.distance};
                    Q.push(n);
                }
            }
        }
    }
    if(steps > maxSteps) {
        console.log('Number of visited: ' + V.length);
    }
    return -1;
}

function inQueue(v, V) {
    for(i in V) {
        if(V[i].xy[0] == v.xy[0] && V[i].xy[1] == v.xy[1]) {
            return V[i];
        }
    }
    return 0;
}

function possibleCombo(x, y) {
    var f = x*x + 3*x + 2*x*y + y + y*y;
    f = f + parseInt(fav);

    var count = krCount(f);
    var open = (count % 2) == 0;
    return open;
}


function displayFloors(size) {
   for(var f=floors.length-1; f >= 0; f--) {
        var fl = 'F'+(f+1)+' ';
        var all = floors[f][0].concat(floors[f][1]);
        for(var i=0; i < size; i++) {
            var u = all[i] == undefined?'  . ':' ' + all[i] + ' ';
            fl += u;
        }
        console.log(fl);
    }
    //console.log('H: ' + hiss + ' (' + steps +')');
}

function parseFloor(line) {
    var microchips = [];
    var generators = [];
    //console.log(line);
    if(line.indexOf('polonium generator') != -1) { 
        generators.push('PG');
    }
    if(line.indexOf('thulium generator') != -1) {
        generators.push('TG');
    }
    if(line.indexOf('promethium generator') != -1) {
        generators.push('OG');
    }
    if(line.indexOf('ruthenium generator') != -1) {
        generators.push('RG');
    }
    if(line.indexOf('cobalt generator') != -1) {
        generators.push('CG');
    }
    if(line.indexOf('hydrogen generator') != -1) {
        generators.push('HG');
    }
    if(line.indexOf('lithium generator') != -1) {
        generators.push('LG');
    }

    if(line.indexOf('polonium-compatible') != -1) {
        microchips.push('PM');
    }
    if(line.indexOf('thulium-compatible') != -1) {
        microchips.push('TM');
    }
    if(line.indexOf('promethium-compatible') != -1) {
        microchips.push('OM');
    }
    if(line.indexOf('ruthenium-compatible') != -1) {
        microchips.push('RM');
    }
    if(line.indexOf('cobalt-compatible') != -1) {
        microchips.push('CM');
    }   
    if(line.indexOf('hydrogen-compatible') != -1) {
        microchips.push('HM');
    }   
    if(line.indexOf('lithium-compatible') != -1) {
        microchips.push('LM');
    }   

    return [generators, microchips]; 
}
