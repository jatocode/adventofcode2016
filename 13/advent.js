var args = process.argv.slice(2);

var fav = 1352;
var x = 31;
var y = 39;

if(args.length > 0) {
    fav = args[0];
    x = args[1];
    y = args[2];
}

console.log('Steps needed to reach (' + x + ',' + y + ') with fav ' + fav +' : ' + maze(x, y));

function maze(destX, destY) {
    isWall(0,1);

    return 0;
}


function isWall(x, y) {
    var f = x*x + 3*x +2*x*y + y + y*y;
    f = f + fav;
    
    var count = krCount(f);
//    console.log(f + ': ' + f.toString(2) + ' -> ' + count);
    var wall = count % 2;

    console.log('(' + x + ',' + y + ') is ' + (wall==0?'an open space':'a wall'));
    return wall;

}

// Snodde en K&R algoritm for att rakna ettor
function krCount(value) {
    var count;
    for (count = 0; value != 0; count++, value &= value-1);
    return count;
}
