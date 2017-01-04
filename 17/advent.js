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

var passcodes = ['ihgpwlah', 'kglvqrro', 'ulqzkmiv', 'qzthpkfp'];
var expected = ['DDRRRD', 'DDUDRLRRUDRD', 'DRURDRUDDLLDLUURRDULRLDUUDDDRR', ''];

for(var p in passcodes) {
	var passcode = passcodes[p];

	var result = breadthFirst(Node(0,0), Node(3,3));
	console.log('The path to the vault with start ' + passcode + ' is : ' +  result.min + ' and longest path: ' + result.max.length);
	if(expected[p] != '' && expected[p] != result.min) {
		console.log('Expected ' + expected[p] + ' got ' + result.min);
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

function breadthFirst(root, end) {
	var reached = {min:'', max:''};

	var Q = [];
	var V = [];
	root.distance = 0;
	root.path = '';

	Q.push(root);
	var steps = 0;
	while(Q.length > 0 ) {
		var current = Q.shift();
		if(current.x() == end.x() && current.y() == end.y()) {
			if(reached.min == '') {
				reached.min = current.path;
			} 
			if(current.path.length > reached.max.length) {
				reached.max = current.path;
			}
			V.push(current);
			continue;
		}

		var neighb = neighb4(current);

		for(i in neighb) {
			var n = neighb[i];
			var nx = n.x();
			var ny = n.y();

			if(findNode(n, V)) {
				continue;
			}
			if(nx >= 0 && ny >= 0 && openPath(nx, ny, current.path, n.lastStep)) {             
				if(n.distance == undefined ) {
					n.distance = current.distance + 1;
					n.parent = current;
					n.path = current.path + n.lastStep;
					Q.push(n);
				}
			}
		}
	}

	return reached;
}


function findNode(v, V) {
    for(i in V) {
        if( V[i].x() == v.x() && V[i].y() == v.y() && V[i].path == v.path) {
            return V[i];
        }
    }
    return 0;
}

function neighb4(node) {
    return [Node(node.x(),     node.y() + 1, 'D' ), 
   			Node(node.x(),     node.y() - 1, 'U' ),
    		Node(node.x() + 1, node.y(), 'R' ),
    		Node(node.x() - 1, node.y(), 'L' ) ];
}

function Node(x, y, lastStep) {
    var n = { xy: [x,y],
        distance: undefined, 
        lastStep: lastStep,
        path: '',
        x: function() { return this.xy[0]; },
        y: function() { return this.xy[1]; },
    };
    return n;
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

