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

var passcode = 'qzthpkfp';

var path = '';


function breadthFirst(root, end, maxSteps) {

    destx = end[0];
    desty = end[1];

    var Q = [];
    var V = [];
    root.distance = 0;

    Q.push(root);
    var steps = 0;
    while(Q.length > 0 && steps++<maxSteps) {
        var current = Q.shift();
      if(current.xy[0] == destx && current.xy[1] == desty) {
            // Found destination. Backtrace!
            var path = [];
            printPath(root.xy[0], root.xy[1]);
            while(current.parent != undefined) {
                path.push(current);
                printPath(current.xy[0], current.xy[1]);
                current = inQueue(current.parent, V);
            }
            printDestination(destx, desty);
            return path.length;
        }

        if(inQueue(current, V)) {
            // Already visited
            continue;
        }
        V.push(current);
        var neighb = [ 
                      {xy:[current.xy[0],   current.xy[1]+1] },
                      {xy:[current.xy[0],   current.xy[1]-1] },
                      {xy:[current.xy[0]+1, current.xy[1]]   },
                      {xy:[current.xy[0]-1, current.xy[1]],  },
        ];

        for(i in neighb) {
            var n = neighb[i];
            var nx = n.xy[0];
            var ny = n.xy[1];
            if(!openSpace(nx, ny)) {
                printWall(nx, ny);
            }
            if(inQueue(n, Q)) {
                continue;
            }
            if(nx >= 0 && ny >= 0 && openSpace(nx, ny)) {             
                printChecked(nx, ny);
                if(n.distance == undefined ) {
                    n.distance = current.distance + 1;
                    n.parent = {xy:[current.xy[0], current.xy[1]], distance:current.distance};
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
