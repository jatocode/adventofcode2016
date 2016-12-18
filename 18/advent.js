var startrow = '.^^^^^.^^.^^^.^...^..^^.^.^..^^^^^^^^^^..^...^^.^..^^^^..^^^^...^.^.^^^^^^^^....^..^^^^^^.^^^.^^^.^^';

//var startrow = '..^^.';

var safe = 0;
var rooms = 400000;
var SAFE = 1;
var TRAP = 0;

var rows = [];

var row = [];
for(i in startrow.split('')) {
    if(startrow[i] == '.') {
        row.push(SAFE);
    } else if(startrow[i] == '^') {
        row.push(TRAP)
    }
}
rows.push(row);

for(var room=0; room < rooms; room++ ) {
    if(rows[room] == undefined) {
         rows[room] = [];
    }
    //console.log(room + ' ' + JSON.stringify(rows[room]));
    for(var ti=0; ti < rows[0].length ; ti++) {
        var tile;
        if(room == 0) {
            tile = rows[room][ti];
            safe += tile;
        } else {            
            left = rows[room-1][parseInt(ti) - 1];
            if(left == undefined) left = SAFE;

            center = rows[room-1][parseInt(ti)];

            right = rows[room-1][parseInt(ti) + 1];
            if(right == undefined) right = SAFE;

            tile = SAFE;
            if(left == TRAP && center == TRAP && right == SAFE) {
                tile = TRAP;
            } 
            if (left == SAFE && center == TRAP && right == TRAP) {
               tile = TRAP;
            } 
            if (left == TRAP && center == SAFE && right == SAFE) {
                tile = TRAP;
            } 
            if (left == SAFE && center == SAFE && right == TRAP) {
                tile = TRAP;
            } 

            //console.log('Index ' + ti + ' ' + left + ' '+ center + ' ' + right + ' ' + (tile==SAFE?'SAFE':'TRAP'));
            safe += tile;
            rows[room].push(tile);
        }
    }
    //console.log(room + ' ' + JSON.stringify(rows[room]));
}

console.log('Safe tiles: ' + safe);
