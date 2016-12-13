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

// Implement simple pathfinder
var queue = [];
queue.push({x:0,y:0,w:0});
function maze(q) {
    var x = q.x;
    var y = q.y;
    var w = parseInt(q.w);
    if(x == destx && y == desty) {
        console.log('FF');
        return true;
    }

    var nbs = [{x:x+1, y:y,   w:w+1},
    {x:x,   y:y+1, w:w+1},
    {x:x-1, y:y,   w:w+1},
    {x:x,   y:y-1, w:w+1}];

    for(n in nbs) {
        var nb = nbs[n];
        if (nb.x < 0 || nb.y < 0) {
            //   console.log('Negative: ' + JSON.stringify(nb));
        } else if(isWall(nb.x, nb.y)) {
            //   console.log('isWall:' + JSON.stringify(nb));
        } else if(inQueueAndHeavy(nb)) {
            // Find nb in queue and compare weight
          //  console.log('Heavy: ' + JSON.stringify(nb));
        } else {
            addToQ(nb);
        }
    }

    return false;
}

function find() {
    var steps = 0;
    var found = false;
    var i = 0;
    while(!found && steps++<40) {
        for(i in queue) {
            var q = queue[i];
            found = maze(q);
            if(found) break;
        }
        display(q.x, q.y);
    }
    return steps;
}

display(0,0);
console.log('Steps needed to reach (' + destx + ',' + desty + ') with fav ' + fav +' : ' + find());

function addToQ(c) {
    var f = false;
    for(var i in queue) {
        var p = queue[i];
        if(p.x == c.x && p.y == c.y) {
            f = true;
            if(c.w >= p.w) {
                queue[i].w = c.w;
            }
            return;
        }
    }
    if(!f) queue.push(c);
    return;
}
function inQueueAndHeavy(c) {
    for(var i in queue) {
        var p = queue[i];
        if(p.x == c.x && p.y == c.y && (p.w >= c.w)) {
            return true;
        }
    }
    return false;
}

function display(a,b) {
//    console.log(queue);
//    console.log();
//    console.log(a,':',b);
//    return;
    for(var y=0;y<7;y++) {
        var row = '';
        for(var x=0;x<10;x++) {
            var w = 'O';
            for(i in queue) {
                var q = queue[i];
                if(x == q.x && y == q.y) {
                    a = q.x;
                    b = q.y;
                 //   w = q.w;
                    break;
                }
            }
            if(x == a && y == b) {
                row += w;
            } else {
                row += isWall(x,y)?'#':'.';
            }
        }
        console.log(row);
    }
    console.log();
}

function isWall(x, y) {
    var f = x*x + 3*x +2*x*y + y + y*y;
    f = f + fav;

    var count = krCount(f);
    // console.log(f + ': ' + f.toString(2) + ' -> ' + count);
    var wall = (count % 2) != 0;

    //console.log('(' + x + ',' + y + ') is ' + (wall?'an open space':'a wall'));
    return wall;

}

// Snodde en K&R algoritm for att rakna ettor
function krCount(value) {
    var count;
    for (count = 0; value != 0; count++, value &= value-1);
    return count;
}
