
 var fav = 10;
 var destx = 7;
 var desty = 4;
 fav = 1352;
 destx = 31;
 desty = 39;
var sizex = 50;
var sizey = 50;
var maze;

run();

function run() {
    var start = { xy:[1,1], parent: undefined };
    maze = matrix(sizex + 1, sizey + 1, ' ');

    var steps = find(start, [destx, desty], 1000);
    console.log('Steps needed to reach (' + destx + ',' + desty + ') with fav ' + fav +' : ' + steps);
    displayMaze();

    console.log('In 50 steps:' + find(start, [destx, desty], 50));

}

function find(root, end, maxSteps) {

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
            printPath(root.xy[0], root.xy[1]);
            while(current.parent != undefined) {
                path.push(current);
                printPath(current.xy[0], current.xy[1]);
                current = inQueue(current.parent, V);
            }
            printDestination(destx, desty);
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
    print(x,y, 'O');  
}

function printChecked(x,y) {
    print(x,y, '-');  
}

function printWall(x,y) {
    print(x,y, '#');  
}

function printOpen(x,y) {
    print(x,y, '.');  
}

function printDestination(x,y) {
    print(x,y, 'X');
}

function print(x,y, mark) {
    maze[x][y] = mark;   
}

function displayMaze() {
    console.log('            1         2         3         4');
    console.log('  01234567890123456789012345678901234567890');
    for(var y=0;y<sizey;y++) {
        var row = y + ' ';
        for(var x=0;x<sizex;x++) {
            if(maze[x][y] == ' ') {
              //  if(openSpace(x,y)) printOpen(x,y); else printWall(x,y);
            } 
            row += maze[x][y]; 
            
        }
        console.log(row);
    }
    console.log();
}

function display(a,b) {
    console.log('            1         2         3         4');
    console.log('  01234567890123456789012345678901234567890123456789');
    for(var y=0;y<sizey;y++) {
        var row = y + ' ';
        for(var x=0;x<sizex;x++) {
            row += openSpace(x,y)?'.':'#';
        }
        console.log(row);
    }
    console.log();
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

