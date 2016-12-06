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

    var corrected = '';
    var corrected2 = '';
    for(var col=0; col < lines[0].length; col++) {
        var count = {};
        for(var index in lines) {
            var message = lines[index];

            if(message.length == 0) break;

            var s = message[col];
            count[s] ? count[s]++ : count[s] = 1;

        }
        
        // Vill ha en array för att sortera
        var ca = [];
        Object.keys(count).forEach(function(k) {
            var letter = [];
            letter.push(k);
            letter.push(count[k]);
            ca.push(letter);
        });
        // Sortera på siffra och sen alfabet
        ca.sort(function freq(a,b) {
            if(a[1] < b[1]) return 1; // Antal först
            if(a[1] > b[1]) return -1;
            if(a[0] < b[0]) return -1; // Sen efter alfabet
            if(a[0] > b[0]) return 1;
            return 0;
        });
        corrected += ca[0][0];
        corrected2 += ca[ca.length - 1][0];
    }
    console.log('Message: ' + corrected);
    console.log('Message part 2: ' + corrected2);

});

