var fs = require('fs');
var args = process.argv.slice(2);

var bots = [];
var outputs = [];

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

	for(var l=0; l < lines.length ; l++) {
		var line = lines[l];

		var instr = line.match(/bot (\d+) gives low to (output|bot) (\d+) and high to (output|bot) (\d+)/);
		if(instr) {
			instruction(parseInt(instr[1]), instr[2], parseInt(instr[3]), instr[4], parseInt(instr[5]));
		}

	}

	for(var l=0; l < lines.length ; l++) {
		var line = lines[l];
		var init = line.match(/value (\d+) goes to bot (\d+)/);
		if(init) {
			initBot(parseInt(init[2]), parseInt(init[1]));
			runBot(parseInt(init[2]));
		}

	}
	var product = outputs[0] * outputs[1] * outputs[2];
	console.log('Produkten är :' + product);
	console.log(JSON.stringify(outputs));
});

function runBot(botNo) {
	var bot = bots[botNo];
	if(bot.low == undefined || bot.high == undefined) {
		return; // One chip
	}
	giveTo(botNo, bot.lowTo.ty, bot.lowTo.num, bot.highTo.ty, bot.highTo.num);

	for(b in bots) {
		runBot(b);
	}
}

function instruction(botNo, lowType, lowTo, highType, highTo) {
	var bot = bots[botNo];

	if(bot == undefined) {
		bot = {}
	}

	bot.lowTo = {ty: lowType, num: lowTo};
	bot.highTo = {ty: highType, num: highTo};
	bot.low = undefined;
	bot.high = undefined;

	bots[botNo] = bot;

}

function giveTo(botNo, lowType, lowTo, highType, highTo) {
	var bot = bots[botNo];

	if(bot == undefined) {
		bot = {}
	}
	switch(lowType) {
		case 'output':
			setOutput(lowTo, bot.low);
			bot.low = undefined;
			break;
		case 'bot':
			setHiLo(lowTo, bot.low);
			bot.low = undefined;
			break;
	}
	switch(highType) {
		case 'output':
			setOutput(highTo, bot.high);
			bot.high = undefined;
			break;
		case 'bot':
			setHiLo(highTo, bot.high);
			bot.high = undefined;
			break;
	}
	bots[botNo] = bot;
}

function setOutput(output, value) {
	outputs[output] = value;
}

function setHiLo(botNo, value) {
	var bot = bots[botNo];	

	var old = undefined;
	if(bot.high != undefined) {
		old = bot.high;
	} else {
		old = bot.low;
	}

	if(old < value) {
		bot.low = old;
		bot.high = value;
	} else {
		bot.low = value;
		bot.high = old;
	}

	if(bot.low == 17 && bot.high == 61) { console.log('Its bot ' + botNo);}
	bots[botNo] = bot;	
}

function initBot(botNo, value) {
	var bot = bots[botNo];
	if(bot != undefined) {
		setHiLo(botNo, value);
	} else {
		bot = {};
		bot.high = value;
		bot.low = 0;
		bots[botNo] = bot;
	}
}

