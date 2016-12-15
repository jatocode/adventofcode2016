var fav = 10;
var destx = 7;
var desty = 4;
fav = 1352;
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
    var start = { xy:[1,1], parent: undefined };
    maze = matrix(sizex + 1, sizey + 1, 0);

    var steps = breadthFirst(start, [destx, desty], 1000);
    console.log('Steps needed to reach (' + destx + ',' + desty + ') with fav ' + fav +' : ' + steps);
    //displayMaze();

    //console.log('In 50 steps:' + breadthFirst(start, [destx, desty], 50));

}

function breadthFirst(root, end, maxSteps) {

    destx = end[0];
    desty = end[1];

    root.distance = 0;

    Q.push(root);
    steps = 0;

    displayMaze();
    steps = searchLoop(root, maxSteps);

    if(steps > maxSteps) {
        console.log('Number of visited: ' + V.length);
    }
    // console.log('Not found after ' + steps);
    return steps;
}

function searchLoop(root, maxSteps) {
    var path = [];
    if(Q.length > 0 && steps++<maxSteps) {
      var current = Q.shift();
 //     displayMaze();

      if(current.xy[0] == destx && current.xy[1] == desty) {
            // Found destination. Backtrace!
            printPath(root.xy[0], root.xy[1]);
            while(current.parent != undefined) {
                path.push(current);
                printPath(current.xy[0], current.xy[1]);
                current = inQueue(current.parent, V);
            }
            printDestination(destx, desty);
            printResult('Number of steps: ' + path.length);
            return path.length;
        }

        if(!inQueue(current, V)) {       
            V.push(current);

            var neighb = [ 
                          {xy:[current.xy[0],   current.xy[1]+1] },
                          {xy:[current.xy[0],   current.xy[1]-1] },
                          {xy:[current.xy[0]+1, current.xy[1]]   },
                          {xy:[current.xy[0]-1, current.xy[1]],  },
            ];

            printSearch(current.xy[0], current.xy[1]);

            for(i in neighb) {
                var n = neighb[i];
                var nx = n.xy[0];
                var ny = n.xy[1];
                if(!openSpace(nx, ny)) {
                    printWall(nx, ny);
                }
                if(inQueue(n, Q)) {
                    continue;
                }
                if(nx >= 0 && ny >= 0 && openSpace(nx, ny)) {             
                    printChecked(nx, ny);
                    if(n.distance == undefined ) {
                        n.distance = current.distance + 1;
                        n.parent = {xy:[current.xy[0], current.xy[1]], distance:current.distance};
                        maze[current.xy[0]][current.xy[1]] = n.distance;
                        Q.push(n);
                    }
                }
            }
        }
        setTimeout(function() { 
            searchLoop(root, maxSteps);
        }, 2);
    }    
    return path.length;
}

function inQueue(v, V) {
    for(i in V) {
        if(V[i].xy[0] == v.xy[0] && V[i].xy[1] == v.xy[1]) {
            return V[i];
        }
    }
    return 0;
}

function openSpace(x, y) {
    var f = x*x + 3*x + 2*x*y + y + y*y;
    f = f + parseInt(fav);

    var count = krCount(f);
    var open = (count % 2) == 0;
    return open;
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

