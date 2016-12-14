var args = process.argv.slice(2);

var fav = 1352;
var destx = 31;
var desty = 39;

if(args.length > 0) {
    fav = parseInt(args[0]);
    destx = parseInt(args[1]);
    desty = parseInt(args[2]);
}

var steps = 0;
/*
Breadth-First-Search(Graph, root):
    
    for each node n in Graph:            
        n.distance = INFINITY        
        n.parent = NIL

    create empty queue Q      

    root.distance = 0
    Q.enqueue(root)                      

    while Q is not empty:        
        current = Q.dequeue()
        for each node n that is adjacent to current:
            if n.distance == INFINITY:
                n.distance = current.distance + 1
                n.parent = current
                Q.enqueue(n)
*/
var start = { xy:[0,0], parent: undefined };

function find(root) {

    var Q = [];
    root.distance = 0;

    Q.push(root);
    while(Q.length > 0) {
        var current = Q.pop();
        if(current.xy[0] == destx && current.xy[1] == desty) {
            console.log('Found!');
            return Q;
        }
        console.log('Current:' + JSON.stringify(current));
        var neighb = [ 
                    {xy:[current.xy[0]-1, current.xy[1]],  },
                    {xy:[current.xy[0],   current.xy[1]+1] },
                    {xy:[current.xy[0]+1, current.xy[1]]   },
                    {xy:[current.xy[0],   current.xy[1]-1] }
                    ];

        for(i in neighb) {
            var n = neighb[i];
            var nx = n.xy[0];
            var ny = n.xy[1];
            //console.log(nx + ',' + ny);
            if(nx >= 0 && ny >= 0) {             
                if(n.distance == undefined) {
                    n.distance = current.distance + 1;
                    n.parent = [current.xy[0], current.xy[1]];

                    if(openSpace(nx, ny)) {  
                        Q.push(n);
                    } 
                }
            }
        }
        console.log(Q);
    }
    console.log('Q:' + Q);
    return steps;
}

display(10,10);

console.log('Steps needed to reach (' + destx + ',' + desty + ') with fav ' + fav +' : ' + find(start));

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

function display(a,b) {
    console.log('  0123456789');
    for(var y=0;y<7;y++) {
        var row = y + ' ';
        for(var x=0;x<10;x++) {
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

