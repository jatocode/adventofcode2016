/*

#########
#S| | | #
#-#-#-#-#
# | | | #
#-#-#-#-#
# | | | #
#-#-#-#-#
# | | |  
####### V

*/
var md5hex = require('md5-hex');

var passcodes = ['hijkl', 'ihgpwlah', 'kglvqrro', 'ulqzkmiv', 'qzthpkfp'];
var expected = ['', 'DDRRRD', 'DDUDRLRRUDRD', 'DRURDRUDDLLDLUURRDULRLDUUDDDRR', ''];

for(var p in passcodes) {
	var passcode = passcodes[p];

	var result = breadthFirst({xy:[0,0]}, [3,3], 5000);
	console.log('The path to the vault with start ' + passcode + ' is : ' +  result);
	if(expected[p] != '' && expected[p] != result) {
		console.log('Expected ' + expected[p] + ' got ' + result);
	}
	console.log();
}


function openPath(x, y, path, lastStep) {
	if(x < 0 || y < 0 || x > 3 || y > 3) {
		return false;
	}

	var test;
	if(path.length > 0 ) {
		test = md5hex(passcode + path).substring(0,4);
	} else {
		test = md5hex(passcode).substring(0,4);		
	}
	var dirs = {U:0, D:1, L:2, R:3};
	var k = test[dirs[lastStep]];

	var open = false;
	if(k.match(/[bcdef]/)) {
		open = true;
	}
	//console.log(x + ',' + y + ' ' + passcode + path + '( ' + test + '), ' + path + ', ' + lastStep + ' -> ' + open);

	return open;
}

function breadthFirst(root, end, maxSteps) {
	var current = [0,0];
	var reached = [];

	destx = end[0];
	desty = end[1];

	var Q = [];
	var V = [];
	root.distance = 0;
	root.path = '';

	Q.push(root);
	var steps = 0;
	while(Q.length > 0 && steps++<maxSteps) {
		var current = Q.shift();

		if(current.xy[0] == destx && current.xy[1] == desty) {
			reached.push(current);
		}

		var neighb = [ 
			{xy:[current.xy[0],   current.xy[1]+1], lastStep: 'D' },
			{xy:[current.xy[0],   current.xy[1]-1], lastStep: 'U' },
			{xy:[current.xy[0]+1, current.xy[1]],   lastStep: 'R' },
			{xy:[current.xy[0]-1, current.xy[1]],   lastStep: 'L' },
		];

		for(i in neighb) {
			var n = neighb[i];
			var nx = n.xy[0];
			var ny = n.xy[1];

			if(inQueue(n, Q)) {
				continue;
			}
			if(nx >= 0 && ny >= 0 && openPath(nx, ny, current.path, n.lastStep)) {             
				//printChecked(nx, ny);
				if(n.distance == undefined ) {
					n.distance = current.distance + 1;
					n.parent = {xy:[current.xy[0], current.xy[1]], distance:current.distance};
					n.path = current.path + n.lastStep;
					Q.push(n);
				}
			}
		}
	}

	reached.sort(function(a,b) {
		return a.length - b.length;
	});

	if(reached.length > 0) {
		return reached[0].path;
	}
	return [];
}

function inQueue(v, V) {
    for(i in V) {
        if(V[i].xy[0] == v.xy[0] && 
        	V[i].xy[1] == v.xy[1] && 
        	V[i].path == v.path) {
            return V[i];
        }
    }
    return 0;
}

