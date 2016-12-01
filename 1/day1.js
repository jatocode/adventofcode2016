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
    var pos = [0,0];
    var visited = Array.matrix(200,200,false);
    var revisit = false;

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

        // Mark it
        for(var i=0; i<l && !revisit; i++) {
            var x = pos[0] + i*move[0];
            var y = pos[1] + i*move[1];
            revisit = checkVisit(x,y,visited);
            visited[x][y] = true;
        }

        // Move it
        pos[0] += l * move[0];
        pos[1] += l * move[1];

    }

    if(!revisit) {
        // Calc using taxicab distance formula
        var x1 = pos[0];
        var y1 = pos[1];
        var distance = Math.abs(x1 - 0) + Math.abs(y1 - 0);

        console.log('Distance to Easter Bunny HQ: ' + distance);
    }
});

function checkVisit(x,y, visited) {
    if(visited[x][y] == true) {
        console.log('REVISIT at ' + x + ', ' + y);

        // Calc using taxicab distance formula
        var distance = Math.abs(x - 0) + Math.abs(y - 0);

        console.log('Distance to revisited Easter Bunny HQ: ' + distance);
        return true;
    }
    return false;
}

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
