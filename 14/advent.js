var md5hex = require('md5-hex');
var salt = 'yjdafjpo';

//salt = 'abc';

var i = 0;
var search = true;
var possible = [];
var keys = [];
while(search && i < 3000000 && keys.length < 65) {
	var hash = md5hex(salt + i);

	var regex3 = /(.)\1{2,}/; 
	var found3 = hash.match(regex3);
	if(found3) {
		var regex = new RegExp('(' + found3[1][0] + ')\\1{4}');
		possible.push({hash: hash, regex: regex ,index:i});
	}
	var found5 = found3 && found3[0].length == 5;
	if(found5) {
		if(possible.length > 0 && (i - possible[possible.length-1].index) > 1000) {
			possible = [];
		} else {
			for(pi in possible) {
				var p = possible[pi];
				if((i - p.index) < 1000 && (i - p.index != 0)) {
					var found = hash.match(p.regex);
					if(found) {
						keys.push(p);
					//	console.log('Key #' + keys.length + ' at ' + p.index + ' because ' + p.regex + ' matched ' + hash);
					}
				} 
			}
		}
	}	
	
	i++;

}
console.log('Index for key @ 64 is: ' + keys[63].index);
