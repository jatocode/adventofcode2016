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

var passcode = 'qzthpkfp';
//passcode = 'hijkl';
var current = [0,0];

console.log('The path to the vault is : ' + findVault());

function findVault() {
	return breadthFirst({xy:[0,0]}, [3,3], 5000);
}

function openPath(x, y, path, lastStep) {
	//console.log(x + ',' + y + ' ' + path + ' ' + lastStep);
	if(x < 0 || y < 0 || x > 3 || y > 3) {
		return false;
	}

	// Path minus förra steget borde det bli??
	var test;
	if(path.length > 0 ) {
		test = md5hex(passcode + path.substring(0, path.length -1) ).substring(0,4);
	} else {
		test = md5hex(passcode).substring(0,4);		
	}
	var dirs = {D:0, U:1, L:2, R:3};
	var k = test[dirs[lastStep]];
	if(k.match(/[bcdef]/)) {
		return true;
	}
	return false;
}

function breadthFirst(root, end, maxSteps) {

	destx = end[0];
	desty = end[1];

	var Q = [];
	var V = [];
	root.distance = 0;
	root.path = '';

	Q.push(root);
	var steps = 0;
	while(Q.length > 0 && steps++<maxSteps) {
		console.log(Q.length);
		var current = Q.shift();

		// Are we there yet?
		if(current.xy[0] == destx && current.xy[1] == desty) {
			// Found destination. Backtrace!
			console.log('Reached ' + current.xy);
			//printDestination(destx, desty);
			return current.path;
		}

		// if(inQueue(current, V)) {
		// 	// Already visited
		// 	continue;
		// }
		// V.push(current);
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
	if(steps > maxSteps) {
		console.log('Number of visited: ' + V.length);
	}
	// console.log('Not found after ' + steps);
	return -1;
}

function inQueue(v, V) {
    for(i in V) {
        if(V[i].xy[0] == v.xy[0] && V[i].xy[1] == v.xy[1]) {
            return V[i];
        }
    }
    return 0;
}

