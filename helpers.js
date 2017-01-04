// Test functions
var start = Node(1,1);
var end = Node(7,4);
var testArray = [
    '.#.####.##',
    '..#..#...#',
    '#....##...',
    '###.#.###.',
    '.##..#..#.',
    '..##....#.',
    '#...##.###'
];

var shortestPath = [ [ 7, 4 ], [ 6, 4 ], [ 6, 5 ], [ 5, 5 ], [ 4, 5 ], [ 4, 4 ], [ 3, 4 ], [ 3, 3 ], [ 3, 2 ], [ 2, 2 ], [ 1, 2 ] ];

var path = breadthfirst(start, end, pathCheckTest);
if(path.length < 0) {
    console.log('Path finder failed');
}
var prettypath = prettyPrintPath(path);
if(comparePath(path, prettypath)) {
    console.log('Not shortest path');
}
console.log('Path length: ' + path.length);

// Breadth First
function breadthfirst(root, end, possiblePath) {

    console.log('BFS, looking for path from ' + root.xy + ' to ' + end.xy);

    var Q = [];
    var V = [];
    root.distance = 0;
    Q.push(root);

    while(Q.length > 0) {
        var current = Q.shift();
        if(current.x() == end.x() && current.y() == end.y()) {
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
        var neighb = neighb4(current);
        for(i in neighb) {
            var n = neighb[i];
            if(inQueue(n, Q)) {
                continue;
            }
            if( possiblePath(n.x(), n.y()) ) {             
                if(n.distance == undefined ) {
                    n.distance = current.distance + 1;
                    n.parent = Node(current.x(), current.y());
                    n.parent.distance = current.distance;
                    Q.push(n);
                }
            }
        }
    }

    return -1;
}

function inQueue(v, V) {
    for(i in V) {
        if( V[i].x() == v.x() && V[i].y() == v.y() ) {
            return V[i];
        }
    }
    return 0;
}

function neighb4(node) {
    return [Node(node.x(),     node.y() + 1 ), 
            Node(node.x(),     node.y() - 1 ),
            Node(node.x() + 1, node.y() ),
            Node(node.x() - 1, node.y() ) ];
}

function Node(x, y) {
    var n = { xy: [x,y],
              distance: undefined, 
              g: undefined, 
              f: undefined,
              x: function() { return this.xy[0]; },
              y: function() { return this.xy[1]; },
            };
    return n;
}

// For testing
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
    if(x < 0 || y < 0 || y > testArray.length - 1 || x > testArray[y].length - 1) {
        return false;
    }
    var xdata = testArray[y].split('');
    //console.log(xdata[x]);
    if(xdata[x] == '#') {
        return false;
    } 
    return true;
}

