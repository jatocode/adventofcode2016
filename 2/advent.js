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
//        console.log(JSON.stringify(instructions));
        var found = '';
        if (instructions.length == 0) {
            break;
        }
        for(var index in instructions) {
            var inst = instructions[index];
            switch(inst) {
                case "D":
                    if(key.y + 1 > 2 ) {
                        found = keypad(key.x, key.y);
                    } else {
                        key.y++;
                    }
                    break;
                case "U":
                    if(key.y - 1 < 0 ) {
                        found = keypad(key.x, key.y);
                    } else {
                        key.y--;
                    }
                    break;
                case "L":
                    if(key.x - 1 < 0 ) {
                        found = keypad(key.x, key.y);
                    } else {
                        key.x--;
                    }
                    break;
                case "R":
                    if(key.x + 1 > 2 ) {
                        found = keypad(key.x, key.y);
                    } else {
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

    return keys[y][x];;
}

