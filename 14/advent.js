var md5hex = require('md5-hex');
var salt = 'yjdafjpo';

salt = 'abc';

var i = 198;
var search = true;
var possible = [];
var keys = [];
while(search && i < 201 && keys.length < 65) {
	var hash = md5hex(salt + i);
	//console.log(hash);

	var regex3 = /([a-z]|[0-9])\1\1\1/; // Varför 2?
	var found3 = hash.match(regex3);
	if(found3) {
		console.log(found3);
		console.log('Found possible at ' + i + ' : ' + hash);
		var regex = new RegExp('(' + found3[1][0] + ')\\1{4}');
		possible.push({hash: hash, regex: regex ,index:i});
	}
	var regex5 = /(.)\1{4}/; // Varför 4?
	var found5 = hash.match(regex5);
	if(found5) {
		console.log('Found a 5 at ' + i + ' : ' + hash);
		if((i - possible[possible.length-1].index) > 1000) {
			possible = [];
		} else {
			// For varje möjlig, kolla om index - i < 1000, då är det nyckel
			for(pi in possible) {
				var p = possible[pi];
				//console.log(p);
				if((i - p.index) < 1000) {
					var found = hash.match(p.regex);
					if(found) {
					//	console.log(p);
					//	console.log(found);
						keys.push(p);
					//	console.log('Key #' + keys.length + ' at ' + i);
					}
				} 
			}
		}
	}	
	
	i++;

}
