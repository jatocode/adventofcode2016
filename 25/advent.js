var fs = require('fs');
var args = process.argv.slice(2);

var instructions = [];
var regs = [];
regs['d'] = regs['c'] = regs['b'] = regs['a'] = 0;
regs['a'] = 0;

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
	var input=0000;
	while(input < 50000) {
		var i=0;
		var steps = 0;
		var test = '';
		regs['a'] = input;
		while(i < instructions.length && steps < 100000) {
			var inst = instructions[i];
			steps++;
	//	    console.log(i + ' : ' + inst.type + ':' + inst.data + ' a=' + regs['a'] + ' b=' + regs['b'] + ' c=' + regs['c'] + ' d=' + regs['d']);
	// 479011005
			switch(inst.type) {
				case 'nop':
					i++;
					break;
				case 'mul':
					var f1 = registerOrData(inst.data[0]);
					var f2 = registerOrData(inst.data[1]);
					regs[inst.data[2]] = f1 * f2;
					i++;
					break;
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
				case 'out':
					var out = registerOrData(inst.data[0]);
					test = test + out;
					if(test.length == 8) {
						//console.log(input + '	' + test);
					}
					if(test.length == 16) {
						//console.log(input + '	' + test);
					}
					if(test.length == 32) {
						//console.log(test);
						//if(parseInt(test,2) == 85 || parseInt(test,2) == 170) {
						//if(parseInt(test,2) == 21845 || parseInt(test,2) == 43690) {
						if(parseInt(test,2) == 1431655765 || parseInt(test,2) == 2863311530) {

							console.log('Found candidate @' + input);
							console.log(test);
							//continue;
						} else {
							//console.log('Not ' + input);
							//input++;	
							//continue;	
						}
						test = '';
					}
					i++;
					break;
	            default:
	                console.log('Monorail failure');
	                console.log(inst);
	                break;
	        }
		}
		//console.log(input);
		input++;
	}
	console.log('Last input was ' + input);
});

function registerOrData(input) {
	var ch = input.match(/[a-d]+/);
	if(ch) {
		return regs[input];
	} else {
		return parseInt(input);
	}        
}
