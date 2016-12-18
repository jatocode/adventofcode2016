var startrow = '.^^^^^.^^.^^^.^...^..^^.^.^..^^^^^^^^^^..^...^^.^..^^^^..^^^^...^.^.^^^^^^^^....^..^^^^^^.^^^.^^^.^^';
var safe = 0;
var rooms = 40;

var rows = [];

for(i in startrow.split('')) {
    var row = [];
    if(startrow[i] == '.') {
        row.push(1);
    } else if(startrow[i] == '^') {
        row.push(0)
    }
    rows.push(row);
}

for(var room=0; room < rooms; room++ ) {
    for(r in rows[room]) {
        var tile;
        if(room == 0) {
            tile = rows[room][r];
            safe += tile;
        } else {
            // LOGIC

        }
    }
}

console.log('Safe tiles: ' + safe);
