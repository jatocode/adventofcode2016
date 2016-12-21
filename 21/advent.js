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

var plain = 'abcdefgh';
plain = 'abcde';

var scrambled = plain;

read(args[0], function(data) {
    var lines = data.split("\n");
    var ops = [];
    for(l in lines) {
        var line = lines[l];

        var len = scrambled.length;
        var match = line.match(/swap position (\d+) with position (\d+)/);
        console.log(scrambled + ' <- ' + line);
        if(match) swapPos(match[1], match[2]);

        match = line.match(/swap letter (.) with letter (.)/);
        if(match) swapLetter(match[1], match[2]);

        match = line.match(/rotate (left|right) (\d+) .*/);
        if(match) rotateSteps(match[1], match[2]);

        match = line.match(/rotate based on position of letter (.)/);
        if(match) rotateLetter(match[1]);

        match = line.match(/reverse positions (\d+) through (\d+)/);
        if(match) reversePos(match[1], match[2]);

        match = line.match(/move position (\d+) to position (\d+)/);
        if(match) movePos(match[1], match[2]);
        
        if(scrambled.length != len) {
            console.log('Error!');
            break;
        }
    }
    console.log('Final scrambled: ' + scrambled);

    console.log('  -----  ');

    // Part 2. Bang bang flip it and reverse it
//    scrambled = 'fbgdceah';
    for(var l=lines.length-1; l >= 0; l--) {
        var line = lines[l];

        var len = scrambled.length;
        var match = line.match(/swap position (\d+) with position (\d+)/);
        console.log(scrambled + ' <- ' + line);

        if(match) swapPos(match[2], match[1]);

        match = line.match(/swap letter (.) with letter (.)/);
        if(match) swapLetter(match[1], match[2]);

        match = line.match(/rotate (left|right) (\d+) .*/);
        if(match) {
            var dir = match[1]=='left'?'right':'left';
            rotateSteps(dir, match[2]);
        }

        match = line.match(/rotate based on position of letter (.)/);
        if(match) rotateLetterReverse(match[1]);

        match = line.match(/reverse positions (\d+) through (\d+)/);
        if(match) reversePos(match[1], match[2]);

        match = line.match(/move position (\d+) to position (\d+)/);
        if(match) movePos(match[2], match[0]);
        
        if(scrambled.length != len) {
            console.log('Error!');
            break;
        }
    }
    console.log('Part 2. Unscrambled: ' + scrambled);

});

function swapPos(a, b) {
    var ac = scrambled[a];
    var bc = scrambled[b];

    scrambled = scrambled.substr(0, a) + bc + scrambled.substr(parseInt(a)+1); 
    scrambled = scrambled.substr(0, b) + ac + scrambled.substr(parseInt(b)+1); 
}

function swapLetter(a, b) {
    var regex = new RegExp(a, "g");
    scrambled = scrambled.replace(regex, '#');
    regex = new RegExp(b, "g");
    scrambled = scrambled.replace(regex, a);
    regex = new RegExp('#', "g");
    scrambled = scrambled.replace(regex, b);
}

function rotateSteps(a, b) {
    console.log('Rotate ' + a + ' ' + b);
    if(a == 'left') {
       scrambled = scrambled.slice(b) + scrambled.slice(0, b);
    }
    if(a == 'right') {
       scrambled = scrambled.slice(-b) + scrambled.slice(0, -b);
    }
}

function rotateLetterReverse(a) {
    var steps = scrambled.indexOf(a);
    steps += 1;
    if(steps > 3) {
        steps -= 2;
    } 
    rotateSteps('left', steps % scrambled.length);
}
function rotateLetter(a) {
    var steps = scrambled.indexOf(a);
    if(steps >= 4) {
        steps += 1;
    }
    steps += 1;
    rotateSteps('right', steps % scrambled.length);
}

function reversePos(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    var x = scrambled.slice( 0, a );
    var y = scrambled.slice( a , b +1  ).split('').reverse().join('');
    var z = scrambled.slice( b + 1 );
    scrambled = x + y + z;
}

function movePos(a, b) {
    var temp = scrambled.slice(0,a) + scrambled.slice(parseInt(a)+1);
    if(b != 0) {
        scrambled = temp.substr(0, b) + scrambled[a] + temp.substr(parseInt(b));
    } else {
        scrambled = scrambled[a] + temp.substr(parseInt(b));
    }

}
