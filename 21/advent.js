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
//plain = 'abcde';

var scrambled = plain;

read(args[0], function(data) {
    var lines = data.split("\n");
    var ops = [];
    for(l in lines) {
        var line = lines[l];

        var l = scrambled.length;
        var match = line.match(/swap position (\d+) with position (\d+)/);
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
        
        console.log(scrambled);
        if(scrambled.length != l) {
            console.log('Error!');
            break;
        }
    }
    console.log('Final scrambled: ' + scrambled);
});

function swapPos(a, b) {
    console.log('swap position ' + a + ' ' + b);
    var ac = scrambled[a];
    var bc = scrambled[b];

    scrambled = scrambled.substr(0, a) + bc + scrambled.substr(parseInt(a)+1); 
    scrambled = scrambled.substr(0, b) + ac + scrambled.substr(parseInt(b)+1); 
}

function swapLetter(a, b) {
    console.log('swap letter ' + a + ' ' + b);
    var regex = new RegExp(a, "g");
    scrambled = scrambled.replace(regex, '#');
    regex = new RegExp(b, "g");
    scrambled = scrambled.replace(regex, a);
    regex = new RegExp('#', "g");
    scrambled = scrambled.replace(regex, b);
}

function rotateSteps(a, b) {
    console.log('rotateSteps ' + a + ' ' + b);
    if(a == 'left') {
       scrambled = scrambled.slice(b) + scrambled.slice(0, b);
    }
    if(a == 'right') {
       scrambled = scrambled.slice(-b) + scrambled.slice(0, -b);
    }
}

function rotateLetter(a) {
    console.log('rotateLetter ' + a );
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
    console.log('reversePos ' + a + ' ' + b);
    var x = scrambled.slice( 0, a );
    var y = scrambled.slice( a , b +1  ).split('').reverse().join('');
    var z = scrambled.slice( b + 1 );
    scrambled = x + y + z;
}

function movePos(a, b) {
    console.log('movePos ' + a + ' ' + b);
    var temp = scrambled.slice(0,a) + scrambled.slice(parseInt(a)+1);
    //console.log(temp);
    if(b != 0) {
        scrambled = temp.substr(0, b) + scrambled[a] + temp.substr(parseInt(b));
    } else {
        scrambled = scrambled[a] + temp.substr(parseInt(b));
    }

}
