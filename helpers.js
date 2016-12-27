
function breadhfirst(root, end) {

    destx = end[0];
    desty = end[1];

    var Q = [];
    var V = [];
    root.distance = 0;

    Q.push(root);
    var steps = 0;
    while(Q.length > 0) {
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
            continue;
        }
        V.push(current);
        var neighb = [{xy:[current.xy[0],   current.xy[1]+1] },
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
            if(nx >= 0 && ny >= 0 && possiblePath(nx, ny)) {             
                if(n.distance == undefined ) {
                    n.distance = current.distance + 1;
                    n.parent = {xy:[current.xy[0], current.xy[1]], distance:current.distance};
                    Q.push(n);
                }
            }
        }
    }

    return -1;
}

function possiblePath(x, y) {
    return true;
}

function inQueue(v, V) {
    for(i in V) {
        if(V[i].xy[0] == v.xy[0] && V[i].xy[1] == v.xy[1]) {
            return V[i];
        }
    }
    return 0;
}