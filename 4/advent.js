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
	var testSectorIDsum = 1514;
    
    var lines = data.split("\n");
	var idSum = 0;

	for(var index in lines) {
		var room = lines[index];

		if(room.length == 0) break;

		//room = room.replace(/-/g,''); // Who cares about dashes
		var regexp = /([a-z-]+)(\d+)\[(.*)\]/;
		var roomdata = room.match(regexp);
		var encrypted = roomdata[1];
		var ID = parseInt(roomdata[2]);
		var checksum = roomdata[3];

		var count = {};
		encrypted.split('').forEach(function(s) {
			count[s] ? count[s]++ : count[s] = 1;
		});

		// Vill ha en array för att sortera
		var ca = [];
		Object.keys(count).forEach(function(k) {
			if(k != '-') {		// Skip dashes		
				var letter = [];
				letter.push(k);
				letter.push(count[k]);
				ca.push(letter);
			}
		});
		// Sortera på siffra och sen alfabet
		ca.sort(function freq(a,b) {
			if(a[1] < b[1]) return 1; // Antal först
			if(a[1] > b[1]) return -1;
			if(a[0] < b[0]) return -1; // Sen efter alfabet
			if(a[0] > b[0]) return 1;
			return 0;
		});

		// Gör sträng av första fem?
		var code = '';
		for(var i=0;i<5;i++) {
			code += ca[i][0];
		}
		//console.log(encrypted + ': ' + checksum + ', ' + ID + ', ' + JSON.stringify(ca) + ' = '+ code);

		if(code == checksum) {
			idSum += ID;
			var clear = caesar(encrypted, ID);
			//console.log('#' + clear + '#');
			if(clear.startsWith('north')) { // Fuskade med grep för att se exakt sträng
				console.log('SectorID for North Pole storage:' + ID);
			}
		}

	}

	console.log('SectorID sum = ' + idSum);

});

function caesar(encrypted, sectorID) {
	var clear = '';
	for(var i=0;i<encrypted.length;i++) {
		var ascii = encrypted.charCodeAt(i);
		if(encrypted[i] != '-') {
			var ceasar = ((ascii - 97 + sectorID) % 26) + 97;
			clear += String.fromCharCode(ceasar);
		} else {
			clear += ' ';
		}
	};

	//console.log(encrypted + ' -> ' + clear);
	return clear;
}

