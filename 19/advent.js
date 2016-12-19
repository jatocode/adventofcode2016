var number = 3017957;

var presents = [];
for(var i=0; i < number ; i++) {
    presents[i] = 1;
}

var elf = 0;
var i = 0;
var emptyelves = 0;
while(emptyelves < (number-1)) {
    var elf = i % number;
    if(presents[elf] == 0 ) {
        i++;
        continue;
    }
    for(var n=(elf + 1) % number; (n % number) != elf ; n++ ) {
        var leftelf = n % number; 
        if(presents[leftelf] > 0) {
            presents[elf] += presents[leftelf];
            presents[leftelf] = 0;
            emptyelves += 1;
            break;
        }
    }
    i = (i + 1) % number;
}

for(var e=0; e < presents.length ; e++) {
    if(presents[e] > 0) {
        console.log('Elf ' + (e+1) + ' has all the presents!');
        break;
    }
}


