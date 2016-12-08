var fs = require('fs');
var args = process.argv.slice(2);

var display;

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

    display = Array.matrix(50,6,0);

    for(index in lines) {
        var line = lines[index];
        if(line.startsWith('rect')) {
            drawRect(line);
        }
        if(line.startsWith('rotate')) {
            rotate(line);
        }
    }
    showDisplay();
    console.log('Number of lit pixels: ' + countDisplay());

});

function showDisplay() {
    for(var y=0;y<display[0].length;y++) {
        var row = '';
        for(var x=0;x<display.length;x++) {
            row += display[x][y]==0?'.':'#';
        }
        console.log(row);
    }
    console.log();
}

function countDisplay() {
    var lit = 0;
    for(var y=0;y<display[0].length;y++) {
        for(var x=0;x<display.length;x++) {
            if(display[x][y]==1) {
                lit++;
            }
        }
    }
    return lit;
}

function drawRect(line) {
    var regex = /rect.(\d+)x(\d+)/;
    var size = line.match(regex);
    //console.log('R: ' + size[1] + 'x' + size[2]);
    for(var y=0; y<size[2] ; y++) {
        for(var x=0; x<size[1]; x++) {
            display[x][y] = 1;
        }
    }
}

function rotate(line) {
    var regex = /rotate.(column|row).(x|y)=(\d+).by.(\d+)/
    var rot = line.match(regex);

    var xy = rot[2];
    var index = rot[3];
    var by = rot[4];

    switch(xy) {
        case 'x':
//            console.log('Shifting col ' + index + ' with ' + by + ' steps');
            for(var n=0; n < by ; n++) {
                display[index].unshift(display[index].pop());
            }
//            showDisplay();
            break;
        case 'y':
 //           console.log('Shifting row ' + index + ' with ' + by + ' steps');
            var row=[];
            for(var i=0; i < display.length ;i++) {
                row.push(display[i][index]);
            }
            //console.log(JSON.stringify(row));
            for(var n=0; n < by ; n++) {
                row.unshift(row.pop());
            }
            // Put it back
            for(var i=0; i < display.length ;i++) {
                display[i][index] = row[i];
            }
            //showDisplay();
            break;
        default:
            break;
    }

}

Array.matrix = function(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}

