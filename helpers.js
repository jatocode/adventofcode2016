var start = {xy:[1,1]};
var end = {xy:[7,4]};

var testArray = [
    '.#.####.##',
    '..#..#...#',
    '#....##...',
    '###.#.###.',
    '.##..#..#.',
    '..##....#.',
    '#...##.###'
];

var shortestPath = [ [ 7, 4 ],
    [ 6, 4 ],
    [ 6, 5 ],
    [ 5, 5 ],
    [ 4, 5 ],
    [ 4, 4 ],
    [ 3, 4 ],
    [ 3, 3 ],
    [ 3, 2 ],
    [ 2, 2 ],
    [ 1, 2 ] ];

//console.log(testArray);
//console.log(testArray.length + ' ' + testArray[0].length);

var path = breadhfirst(start, end, pathCheckTest);
if(path.length < 0) {
    console.log('Path finder failed');
}
var prettypath = prettyPrintPath(path);
if(comparePath(path, prettypath)) {
    console.log('Not shortest path');
}
console.log('Path length: ' + path.length);

function breadhfirst(root, end, possiblePath) {

    destx = end.xy[0];
    desty = end.xy[1];

    console.log('BFS, looking for path from ' + root.xy + ' to ' + end.xy);

    var Q = [];
    var V = [];
    root.distance = 0;

    Q.push(root);
    var steps = 0;
    while(Q.length > 0) {
        var current = Q.shift();
        //        console.log(current);
        if(current.xy[0] == destx && current.xy[1] == desty) {
            // Found destination. Backtrace!
            var path = [];
            while(current.parent != undefined) {
                path.push(current);
                current = inQueue(current.parent, V);
            }
            return path;
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

function checkPath(x, y) {
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

function prettyPrintPath(path) {
    var prettyp = [];
    for(p in path) {
        var node = path[p];
        prettyp.push(node.xy);
    }
    return prettyp;
}

function comparePath(a, b) {
    for(y in a) {
        if(a[y] != b[y]) {
            return false;
        }
    }
    return true;
}

function pathCheckTest(x, y) {
    //console.log(y + ': ' + testArray[y]);
    if(y > testArray.length - 1 || x > testArray[y].length - 1) {
        return false;
    }
    var xdata = testArray[y].split('');
    //console.log(xdata[x]);
    if(xdata[x] == '#') {
        return false;
    } 
    return true;
}

