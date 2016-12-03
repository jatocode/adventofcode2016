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

        // Summan av två  måste vara större än den 3:e

        if(lengths[0] + lengths[1] > lengths[2] &&
           lengths[1] + lengths[2] > lengths[0] &&
           lengths[2] + lengths[0] > lengths[1]) {
            triangles++;
        }
        // console.log(JSON.stringify(lengths));
    }
    console.log('Trianglar:' + triangles);

    // Part 2
    triangles = 0;
    for(var line=0;line<lines.length;line+=3) {
        var vertical = [];
        for(var i=0;i<3 && line+i<lines.length;i++) {
            var lengths = lines[line + i].split(' ');
            lengths = lengths.filter(function(n){ return n != "" }); 
            lengths = lengths.map(function(n){ return parseInt(n) });     

            vertical.push(lengths);
        }

        // Lånade en transponera-array från: 
        // http://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript#comment51565810_17428705
        var rotated = vertical[0].map(function(col, i) { 
          return vertical.map(function(row) { 
            return row[i] 
          })
        });

        //console.log(JSON.stringify(rotated));

        if(rotated.length == 0) break; 

        for(var r in rotated) {
            var vert = rotated[r];
            // Summan av två  måste vara större än den 3:e
            if(vert[0] + vert[1] > vert[2] &&
               vert[1] + vert[2] > vert[0] &&
               vert[2] + vert[0] > vert[1]) {
                triangles++;
            }
        }
        
    }
    console.log('Trianglar på vertikalen:' + triangles);

});

