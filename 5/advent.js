var fs = require('fs');
var md5hex = require('md5-hex');
var args = process.argv.slice(2);

var doorID = 'ffykfhsq';

var index = 0;
var found = 0;
var password = new Array(8);

while(found < 8) {

    var md5 = md5hex(doorID + index++);

    if(md5.startsWith('00000')) {
        var pos = md5[5];
        if(pos < 8 && password[pos] == undefined) {
            password[pos] = md5[6];
            found++;
            var hollywood = '';
            for(var i=0;i<password.length; i++) {
                var l = password[i];
                if(l == undefined) 
                    hollywood += '_'
                else
                    hollywood += l;
            }
            console.log(hollywood);
        }
    }
}
