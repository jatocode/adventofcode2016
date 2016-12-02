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
    var key = { x:0, y:2 };
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
        found = keypad(key.x, key.y);    // EOL
        code += found;
    }

    console.log('The code is: ' + code);
});

function keypad(x, y) {
    if(x == undefined || y == undefined) {
        return 'X';
    }

    var keys1 = [ [1,2,3], 
                 [4,5,6], 
                 [7,8,9] ];

    var keys = [[0,0,1,0,0],
                [0,2,3,4,0],
                [5,6,7,8,9],
               [0,'A','B','C',0],
               [0,0,'D',0,0] ];


    if(y < 0 || y >= keys.length) {
        return undefined;
    }

    if(x < 0 || x >= keys[y].length) {
        return undefined;
    }
    
    if(keys[y][x] == 0) {
        return undefined;
    }

    // console.log(x + ',' + y + '-> ' + keys[y][x]);
    return keys[y][x];
}

