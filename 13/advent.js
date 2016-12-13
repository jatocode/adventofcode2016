var fav = 1352;

console.log(isWall(0,1));
console.log(isWall(0,2));

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
