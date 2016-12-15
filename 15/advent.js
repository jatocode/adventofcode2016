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

    var discs = [];
    for(var l in lines) {
        var line = lines[l];
        var regex = /Disc #(\d+) has (\d+).*time=(\d+).*position.(\d+)/;
        var hit = line.match(regex);
        if(hit) {
            var disc = {num: parseInt(hit[1]), positions:parseInt(hit[2]), start: parseInt(hit[4])};
            discs.push(disc);
        }
    }
    var time=0;
    var found=false;
    while(!found && time < 20000000) {
        var pushed = time;
        for(d in discs) {
            var disc = discs[d];
            disc.current = (disc.start + time + 1) % disc.positions;
            found = discs[0].current == disc.current;
            if(!found) break;

//            console.log(disc.start + ' ' + time + ' ' + disc.positions + ' :' +(disc.start + time + 1)); 
//            console.log(time + ':' + disc.num + ' -> ' + disc.current);
//            console.log();
            time++;
        }
    }
    if(found) {
        console.log('If you push @ : ' + pushed);
        for(d in discs) {
            console.log(discs[d].current);
        }
    }
});

