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
    var pos = [0,0];

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
        switch(compass) {
            case 0:
                pos[1] += l; // N
                break;
            case 1:
                pos[0] += l; // E
                break;
            case 2:
                pos[1] -= l; // S
                break;
            case 3:
                pos[0] -= l; // W
                break;
        }
    }

    // Calc using taxicab distance formula
    var x1 = pos[0];
    var y1 = pos[1];
    var distance = Math.abs(x1 - 0) + Math.abs(y1 - 0);

    console.log('Distance to Easter Bunny HQ: ' + distance);
});
