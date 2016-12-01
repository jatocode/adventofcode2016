var fs = require('fs');
var args = process.argv.slice(2);

function read(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}

read(args[0], function(data) {
    var dirs = data.split(",");

    var compass = 0; // 0 N, 1E, 2S, 3W
    var c = [[0,1], [1,0], [0,-1], [-1,0]];

    var visited = Array.matrix(200,200,false);
    var revisit = false;

    var x = 0;
    var y = 0;

    for(var index in dirs) {
        var v = dirs[index].trim();
        var d = v[0];
        var l = parseInt(v.slice(1));

        if(d == "L") {
            compass--;
            compass = compass<0?3:compass;
        } 
        if (d == "R") {
            compass++;
            compass = compass>3?0:compass;
        }

        var move = c[compass];

        // Mark and move
        for(var i=0; i<l ; i++) {
            x += move[0];
            y += move[1];

            if(visited[x][y] == true) {
                console.log('REVISIT!');
                // Part 2
                revisit = true;
                break;
            }
            visited[x][y] = true;
        }

        if(revisit) {
            break;
        }

    }

    // Calc using taxicab distance formula
    var distance = Math.abs(x - 0) + Math.abs(y - 0);

    console.log('Distance to Easter Bunny HQ: ' + distance);
});

// Snodde den här pga 2d-matriser i javascript verkar kokt i skit
Array.matrix = function(numrows, numcols, initial) {
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
