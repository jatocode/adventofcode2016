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
    var key = { x:0, y:2 }; // Start at 5
    var move = [0,0];
    var code = "";

    for(var line in lines) {
        var instructions = lines[line].split("");
        if (instructions.length == 0) {
            break; // No empty lines
        }

        for(var index in instructions) {
            var inst = instructions[index];
            switch(inst) {
                case "D":
                    move = [0,1];
                    break;
                case "U":
                    move = [0,-1];
                    break;
                case "L":
                    move = [-1,0];
                    break;
                case "R":
                    move = [1,0];
                    break;
            }
            var test = {};
            test.x = key.x + move[0];
            test.y = key.y + move[1];
            if(keypad(test) != -1) {
                key.x = test.x;
                key.y = test.y;
            }
        }
        code += keypad(key);
    }

    console.log('The code is: ' + code);
});

function keypad(key) {
    var x = key.x;
    var y = key.y;

    if(x == undefined || y == undefined) {
        return 'X';
    }

    var keys_part1 = [ [1,2,3], 
                       [4,5,6], 
                       [7,8,9] ];

    var keys = [[0,0,1,0,0],
                [0,2,3,4,0],
                [5,6,7,8,9],
             [0,'A','B','C',0],
               [0,0,'D',0,0] ];

    if(y < 0 || y >= keys.length) {
        return -1;
    }

    if(x < 0 || x >= keys[y].length) {
        return -1;
    }
    
    if(keys[y][x] == 0) {
        return -1;
    }

    // console.log(x + ',' + y + '-> ' + keys[y][x]);
    return keys[y][x];
}

