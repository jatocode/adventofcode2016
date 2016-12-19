var number = 3017957;
number = 5;

var presents = [];
for(var i=0; i < number ; i++) {
    presents[i] = 1;
}
var elves = [];
for(var i=0; i < number ; i++) {
    elves.push(i);
}

var elf = 0;
var i = 0;
var emptyelves = 0;
while(emptyelves < (number-1) && i < 4) {
    var elf = i % number;
    if(presents[elf] == 0 ) {
        console.log((elf+1) + ' is skipped');
        i++;
        continue;
    }
    /* Part 1
    for(var n=(elf + 1) % number; (n % number) != elf ; n++ ) {
        var leftelf = n % number; 
        if(presents[leftelf] > 0) {
            presents[elf] += presents[leftelf];
            presents[leftelf] = 0;
            emptyelves += 1;
            break;
        }
    }
    */
    // Part 2
    var perdegree = 360 / elves.length;
    console.log(perdegree);
    var leftelf = (Math.floor((elf+1) * 180/perdegree)) % number;
    console.log(leftelf);
    console.log(elves[leftelf]);
    if(presents[leftelf] > 0) {
        console.log((elf+1) + ' takes from ' + (leftelf+1));
        presents[elf] += presents[leftelf];
        presents[leftelf] = 0;
        elves.splice(parseInt(leftelf), 1);
        emptyelves += 1;
    }
    console.log(elves);

    i = (i + 1) % number;
}

for(var e=0; e < presents.length ; e++) {
    if(presents[e] > 0) {
        console.log('Elf ' + (e+1) + ' has all the presents!');
        break;
    }
}


