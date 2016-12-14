
 var fav = 10;
 var destx = 7;
 var desty = 4;
 fav = 1352;
 destx = 31;
 desty = 39;
var sizex = 51;
var sizey = 51;
var maze;

run();

function run() {
    var start = { xy:[1,1], parent: undefined };
    maze = matrix(sizex + 1, sizey + 1, ' ');
//    displayMaze();

    var steps = find(start, [destx, desty], 1000);

    console.log('Steps needed to reach (' + destx + ',' + desty + ') with fav ' + fav +' : ' + steps);

    // Part 2
    var count = 0;
    for(var y=0;y<50;y++) {
        for(var x=0;x<50;x++) {
            if(x+y > 50) continue;
            var st = find(start, [x,y], 1000);
            if(st > 0 && st < 50) {
                console.log([x,y] + ':' + st);
                count++;
            }
        }
    }
    console.log(count);
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
            var path = [];
            maze[current.xy[0]][current.xy[1]] = 'X';
            while(current.parent != undefined) {
                path.push(current);
                current = visited2(current.parent, V);
                maze[current.xy[0]][current.xy[1]] = 'O';
            }
            return path.length;
        }

        if(visited(current, V)) {
            var v = visited(current, V);
            if(v.distance > current.distance) {
                var i = indexOf(current, V);
                V[i].distance = current.distance;
                V[i].parent = current.parent;
            }
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
                maze[nx][ny] = '#';
            }
            var q = inQueue(n, Q);
            if(q) {
                continue;
            }
            if(nx >= 0 && ny >= 0 && openSpace(nx, ny)) {             
                maze[nx][ny] = '-';
                //if(n.distance == undefined || n.distance > current.distance) {
                if(n.distance == undefined ) {
                    n.distance = current.distance + 1;
                    n.parent = {xy:[current.xy[0], current.xy[1]], distance:current.distance};
                    Q.push(n);
                }
                //maze[nx][ny] = current.distance; 
            }
        }
    }
    // console.log('Not found after ' + steps);
    return -1;
}

function indexOf(v, V) {
    for(i in V) {
        if(V[i].xy[0] == v.xy[0] && V[i].xy[1] == v.xy[1]) {
            return i;
        }
    }
    return 0;
}
function inQueue(v, V) {
    for(i in V) {
        if(V[i].xy[0] == v.xy[0] && V[i].xy[1] == v.xy[1]) {
        //    if(V[i].distance > v.distance) {
        //        V[i].distance = v.distance;
        //        V[i].parent = v.parent;
        //    }
            return V[i];
        }
    }
    return 0;
}
function visited2(v, V) {
    var vi = [];
    for(i in V) {
        if(V[i].xy[0] == v.xy[0] && V[i].xy[1] == v.xy[1]) {
            vi.push(V[i]);
        }
    }
    if(vi.length > 1) console.log('vi');
    if(vi.length > 0) return vi[0];
    return 0;
}

function visited(v, V) {
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
    //console.log(f + ': ' + f.toString(2) + ' -> ' + count);
    // console.log('(' + x + ',' + y + ') is ' + (!open?'a wall':'an open space') + ' because ' + f + ' has ' + count + ' 1:s');
    return open;
}

function isWall(x, y) {
    var f = x*x + 3*x + 2*x*y + y + y*y;
    f = f + parseInt(fav);

    var count = krCount(f);
    var wall = (count % 2) != 0;
    //console.log(f + ': ' + f.toString(2) + ' -> ' + count);
    // console.log('(' + x + ',' + y + ') is ' + (wall?'a wall':'an open space') + ' because ' + f + ' has ' + count + ' 1:s');
    return wall;
}

function displayMaze() {
    console.log('            1         2         3         4');
    console.log('  01234567890123456789012345678901234567890');
    for(var y=0;y<sizey;y++) {
        var row = y + ' ';
        for(var x=0;x<sizex;x++) {
            if(isWall(x,y))  maze[x][y] = '#'; else maze[x][y]='.';
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
            row += isWall(x,y)?'#':'.';
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

