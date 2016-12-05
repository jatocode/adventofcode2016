var fs = require('fs');
var md5hex = require('md5-hex');
var args = process.argv.slice(2);

var doorID = 'ffykfhsq';

var index = 0;
var found = 0;
var password = '';

while(found < 8) {

    var md5 = md5hex(doorID + index++);

    if(md5.startsWith('00000')) {
        found++;
        password += md5[5];
        console.log(md5);
    }
}
console.log('Password: ' + password);
