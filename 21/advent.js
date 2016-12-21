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
        if(line == undefined) continue;

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
    }
    console.log(scrambled);
});

function swapPos(a, b) {
    console.log('swap position ' + a + ' ' + b);
    var ac = scrambled[a];
    var bc = scrambled[b];

    scrambled = scrambled.substr(0, a) + bc + scrambled.substr(a+1); 
    scrambled = scrambled.substr(0, b) + ac + scrambled.substr(b+1); 
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
       scrambled = scrambled.slice(-b) + scrambled.slice(b);
    }
}

function rotateLetter(a) {
    console.log('rotateLetter ' + a );
}

function reversePos(a, b) {
    console.log('reversePos ' + a + ' ' + b);
    scrambled = scrambled.substr(a,b+1).split('').reverse().join('');
}

function movePos(a, b) {
    console.log('movePos ' + a + ' ' + b);
}
