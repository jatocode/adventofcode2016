var fs = require('fs');
var args = process.argv.slice(2);

var floors = new Array(4);
var hiss = 1;
var steps = 0;

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

    
    for(var l=0; l < lines.length ; l++) {
        var line = lines[l];
        floors[l] = parseFloor(line);
    }

    displayFloors();

});

function displayFloors() {
   for(var f=floors.length-1; f >= 0; f--) {
        var fl = 'F'+(f+1)+' ';
        var all = floors[f][0].concat(floors[f][1]);
        for(var i=0; i < 10; i++) {
            var u = all[i] == undefined?'  . ':' ' + all[i] + ' ';
            fl += u;
        }
        console.log(fl);
    }
    console.log('H: ' + hiss + ' (' + steps +')');
}

function parseFloor(line) {
    var microchips = [];
    var generators = [];
    //console.log(line);
    if(line.indexOf('polonium generator') != -1) { 
        generators.push('PG');
    }
    if(line.indexOf('thulium generator') != -1) {
        generators.push('TG');
    }
    if(line.indexOf('promethium generator') != -1) {
        generators.push('OG');
    }
    if(line.indexOf('ruthenium generator') != -1) {
        generators.push('RG');
    }
    if(line.indexOf('cobalt generator') != -1) {
        generators.push('CG');
    }

    if(line.indexOf('polonium-compatible') != -1) {
        microchips.push('PC');
    }
    if(line.indexOf('thulium-compatible') != -1) {
        microchips.push('TC');
    }
    if(line.indexOf('promethium-compatible') != -1) {
        microchips.push('OC');
    }
    if(line.indexOf('ruthenium-compatible') != -1) {
        microchips.push('RC');
    }
    if(line.indexOf('cobalt-compatible') != -1) {
        microchips.push('CC');
    }   
    return [generators, microchips]; 
}