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

    var floors = new Array(4);
    
    for(var l=0; l < lines.length ; l++) {
        var line = lines[l];
        floors[l] = parseFloor(line);
    }
    
    console.log(JSON.stringify(floors));

});

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
        generators.push('PRG');
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
        microchips.push('PRC');
    }
    if(line.indexOf('ruthenium-compatible') != -1) {
        microchips.push('RC');
    }
    if(line.indexOf('cobalt-compatible') != -1) {
        microchips.push('CC');
    }   
    return [generators, microchips]; 
}
