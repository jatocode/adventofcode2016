var fs = require('fs');
var args = process.argv.slice(2);

var instructions = [];
var regs = [];
regs['d'] = regs['c'] = regs['b'] = regs['a'] = 0;
regs['a'] = 12;

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
		var f = line.match(/([a-z]+) (-?\d+|[a-d]).?(-?\d+|[a-d])?/);
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
//	    console.log(i + ' : ' + inst.type + ':' + inst.data + ' a=' + regs['a'] + ' b=' + regs['b'] + ' c=' + regs['c'] + ' d=' + regs['d']);

		switch(inst.type) {
            case 'cpy':
				if(inst.data[1].match(/[a-d]+/)) {
					regs[inst.data[1]] = registerOrData(inst.data[0]);
				} else {
					console.log('Illegal');
				}
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
            case 'jnz':
				var c = registerOrData(inst.data[0]);
				var s = registerOrData(inst.data[1]);
				if(c != 0) {
					i += s;
				} else {
					i++;
				}
				break;
			case 'tgl':
				var is = registerOrData(inst.data[0]);
				if(instructions[i + is] == undefined || is == 0) {
					//console.log('OoR ' + (i + is) );
				} else {
					switch( instructions[i + is].type ) {
						case 'inc':
							console.log('Toogled inc to dec @' + i);
							instructions[i + is].type = 'dec';
							break; 
						case 'dec':
							console.log('Toogled dec to inc @' + i);
							instructions[i + is].type = 'inc';
							break; 
						case 'jnz':
							console.log('Toogling jnz to cpy');
							instructions[i + is].type = 'cpy';	
							break;					
						case 'cpy':
							console.log('Toogling cpy to jnz');
							instructions[i + is].type = 'jnz';	
							break;
						case 'tgl':
							console.log('Toogled tgl to inc @' + i);
							instructions[i + is].type = 'inc';
							break; 
						default:
						break;
					}
				}
				i++;
				break;
            default:
                console.log('Monorail failure');
                break;
        }
	}
	console.log('Send ' + regs['a'] + ' to the safe!');
});

function registerOrData(input) {
	var ch = input.match(/[a-d]+/);
	if(ch) {
		return regs[input];
	} else {
		return parseInt(input);
	}        
}
