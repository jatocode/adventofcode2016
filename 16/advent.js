var data = '11100010111110100';
var disksize = 272;
disksize = 35651584;

while(data.length < disksize) {
    var a = data;

    // Flip it and reverse it
    var b = a.split('').reverse().join('');
    var t = '';
    for(i in b.split('')) {
        if(b[i] == '1') {
             t += '0';
        } else if (b[i] == '0') {
             t += '1';
        } 
    }
    b = t;

    data = a + '0' + b;
}

data = data.substring(0, disksize);

var checksum = '';
var checksumdata = data;
while(checksum.length % 2 == 0) {
    for(var i=0; i + 2 <= checksumdata.length; i+=2) {
        var pair = checksumdata.substring(i, i + 2);
        if(pair[0] == pair[1]) {
            checksum += '1';
        } else {
            checksum += '0';
        }
    }
    if(checksum.length % 2 == 0) {
        checksumdata = checksum;
        checksum = '';
    }
}
console.log('The checksum is :' + checksum);


