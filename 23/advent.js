var fs = require('fs');
var args = process.argv.slice(2);

var instructions = [];
var regs = [];
regs['d'] = regs['c'] = regs['b'] = regs['a'] = 0;
regs['c'] = 1;

function read(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}

read(args[0], function(data) {
    var lines = data.split("\n");

    for(var l in lines) {
        var line = lines[l];
        var f = line.match(/([a-z]+) (\d+|[a-d]).?(-?\d+|[a-d])?/);
        if(f) {
            var inst = {};
            inst.type = f[1];
            inst.data = [f[2], f[3]];
            instructions.push(inst);
        }
    }
    var i=0;
    while(i < instructions.length) {
        var inst = instructions[i];
        console.log(i + ' : ' + inst.type + ':' + inst.data + ' a=' + regs['a'] + ' b=' + regs['b'] + ' c=' + regs['c'] + ' d=' + regs['d']);
        switch(inst.type) {
            case 'cpy':
                 var c = inst.data[0]; 
                var ch = c.match(/[a-d]+/);
               if(ch) {
                    c = regs[c];
                } else {
                    c = parseInt(c);
                }           
                regs[inst.data[1]] = c;
                i++;
                break;
            case 'inc':
                regs[inst.data[0]]++;         
                i++;       
                break;
            case 'dec':
                regs[inst.data[0]]--;          
                i++;      
                break;
            break;
            case 'jnz':
                var c = inst.data[0]; 
                var s = parseInt(inst.data[1]);
                var ch = c.match(/[a-d]+/);
               if(ch) {
                    c = regs[c];
                } else {
                    c = parseInt(c);
                }

                if(c != 0) {
                    i += s;
                } else {
                    i++;
                }
                break;
            case 'tgl':
                console.log('TOGGLE!');
                break;
            default:
                console.log('Monorail failure');
                break;
        }
    }
    console.log(regs);
});

