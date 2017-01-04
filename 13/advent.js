var fav = 10;
var destx = 7;
var desty = 4;
var param = location.search.split('fav=')[1]
if(param == undefined) {
    fav = 1352;
} else {
    fav = param;
}
destx = 31;
desty = 39;
var sizex = 50;
var sizey = 50;
var maze;

var Q = [];
var V = [];

var steps;

var c = document.getElementById('advent-canvas');
var ctx=c.getContext("2d");

run();

function run() {
    var start = Node(1,1);
    maze = matrix(sizex + 1, sizey + 1, 0);

    var steps = breadthFirst(start, Node(destx, desty) );
    console.log('Steps needed to reach (' + destx + ',' + desty + ') with fav ' + fav +' : ' + steps);
    //displayMaze();

    //console.log('In 50 steps:' + breadthFirst(start, [destx, desty], 50));

}

function breadthFirst(root, end) {

    destx = end.x();
    desty = end.y();

    root.distance = 0;

    Q.push(root);
    steps = 0;

    displayMaze();
    steps = searchLoopBF(root);

    return steps;
}

function searchLoopBF(root) {
    var path = [];
    if(Q.length > 0) {
      var current = Q.shift();

      if(current.x() == destx && current.y() == desty) {
            // Found destination. Backtrace!
            printPath(root.x(), root.y());
            while(current.parent != undefined) {
                path.push(current);
                printPath(current.x(), current.y());
                current = findNode(current.parent, V);
            }
            printDestination(destx, desty);
            printResult('Number of steps: ' + path.length);
            return path.length;
        }

        if(!findNode(current, V)) {       
            V.push(current);

            var neighb = neighb4(current);

            printSearch(current.x(), current.y());

            for(i in neighb) {
                var n = neighb[i];
                var nx = n.x();
                var ny = n.y();
                if(!openSpace(nx, ny)) {
                    printWall(nx, ny);
                }
                if(findNode(n, Q)) {
                    continue;
                }
                if(nx >= 0 && ny >= 0 && openSpace(nx, ny)) {             
                    printChecked(nx, ny);
                    if(n.distance == undefined ) {
                        n.distance = current.distance + 1;
                        n.parent = current;
                        maze[current.xy[0]][current.xy[1]] = n.distance;
                        Q.push(n);
                    }
                }
            }
        }
        setTimeout(function() { 
            searchLoopBF(root);
        }, 2);
    }    
    return path.length;
}

function openSpace(x, y) {
    var f = x*x + 3*x + 2*x*y + y + y*y;
    f = f + parseInt(fav);

    var count = krCount(f);
    var open = (count % 2) == 0;
    return open;
}

function findNode(v, V) {
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
        g: Number.MAX_SAFE_INTEGER, 
        f: Number.MAX_SAFE_INTEGER,
        x: function() { return this.xy[0]; },
        y: function() { return this.xy[1]; },
    };
    return n;
}

function printPath(x,y) {
    print(x,y, '#0000ff');  
}

function printChecked(x,y) {
    print(x,y, '#8888ff');  
}

function printWall(x,y) {
    print(x,y, '#444444');  
}

function printOpen(x,y) {
    print(x,y, '#eeeeee');  
}

function printDestination(x,y) {
    print(x,y, '#ff0000');
}

function printSearch(x,y) {
    print(x,y, '#8888ff');
}

function printResult(result) {
    ctx.font = "30px Helvetica";
    ctx.fillStyle = '#800000';
    ctx.fillText(result, 0,600);
}

function print(x,y, mark) {
    // ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = mark;
    ctx.fillRect(10+x*10,10+y*10,9,9);
    ctx.stroke();
}

function displayMaze() {

 //   console.log('            1         2         3         4');
 //   console.log('  01234567890123456789012345678901234567890');
    for(var y=0;y<sizey;y++) {
        for(var x=0;x<sizex;x++) {
            if(maze[x][y] == 0 ) {
                if(openSpace(x,y)) printOpen(x,y); else printWall(x,y);
            } 
        }
    }
}

// Snodde en K&R algoritm for att rakna ettor
function krCount(value) {
    var count;
    for (count = 0; value != 0; count++, value &= value-1);
    return count;
}

function matrix(numrows, numcols, initial) {
    var arr = [];
    for (var i = -numrows; i < numrows; ++i) {
        var columns = [];
        for (var j = -numcols; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}

