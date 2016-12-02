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
    var lines = data.split("\n");
    var key = { x:1, y:1 };
    var code = "";

    for(var line in lines) {
        var instructions = lines[line].split("");
        var found = '';
        if (instructions.length == 0) {
            break;
        }
        for(var index in instructions) {
            var inst = instructions[index];
            switch(inst) {
                case "D":
                    found = keypad(key.x, key.y + 1);
                    if(found != undefined ) {
                        key.y++;
                    }
                    break;
                case "U":
                    found = keypad(key.x, key.y - 1);
                    if(found != undefined ) {
                        key.y--;
                    }
                    break;
                case "L":
                    found = keypad(key.x - 1, key.y);
                    if(found != undefined ) {
                        key.x--;
                    }
                    break;
                case "R":
                    found = keypad(key.x + 1, key.y);
                    if(found != undefined ) {
                        key.x++;
                    }
                    break;
            }
        }
        found = keypad(key.x, key.y);    
        code += found;
    }

    console.log('The code is: ' + code);
});

function keypad(x, y) {
    if(x == undefined || y == undefined) {
        return 'X';
    }

    var keys = [ [1,2,3], 
                 [4,5,6], 
                 [7,8,9] ];

    if(y < 0 || y >= keys.length) {
        return undefined;
    }

    if(x < 0 || x >= keys[y].length) {
        return undefined;
    }
    
    return keys[y][x];
}

