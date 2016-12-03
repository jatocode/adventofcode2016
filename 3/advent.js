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
    var triangles = 0;
    for(var line in lines) {
        var lengths = lines[line].split(' ');
        lengths = lengths.filter(function(n){ return n != "" }); 
        lengths = lengths.map(function(n){ return parseInt(n) }); 

        // Summan av två  måste vara större än den 3:e?

        if(lengths[0] + lengths[1] > lengths[2] &&
           lengths[1] + lengths[2] > lengths[0] &&
           lengths[2] + lengths[0] > lengths[1]) {
            triangles++;
        }
        // console.log(JSON.stringify(lengths));
    }
    console.log('Trianglar:' + triangles);
});

