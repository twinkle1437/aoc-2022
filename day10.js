const fs = require('fs');
const data = fs.readFileSync('./input/day10.txt', 'utf8');
const raw = data.split(/\r?\n/);

// Part I
let result1 = 0;
let reg = 1;
let clock = 0;
let cycleMap = {};
raw.forEach((line) => {
	if (line === 'noop') {
		clock++;
		checkCycle(clock);
	} else {
		clock++;
		checkCycle(clock);
		clock++;
		checkCycle(clock);
		let v = parseInt(line.split(' ')[1]);
		reg += v;
	}
});

function checkCycle(clock) {
	switch (clock) {
		case 20:
			cycleMap[20] = reg;
			break;
		case 60:
			cycleMap[60] = reg;
			break;
		case 100:
			cycleMap[100] = reg;
			break;
		case 140:
			cycleMap[140] = reg;
			break;
		case 180:
			cycleMap[180] = reg;
			break;
		case 220:
			cycleMap[220] = reg;
			break;
		default:
			break;
	}
}

for (c in cycleMap) {
	result1 += c * cycleMap[c];
}

console.log(result1);

// Part II
let result2 = Array(6).fill('');
let sprite = 1;
let clock2 = 0;

raw.forEach((line) => {
	if (line === 'noop') {
		clock2++;
		drawPixel(clock2, sprite);
	} else {
		clock2++;
		drawPixel(clock2, sprite);
		clock2++;
		drawPixel(clock2, sprite);
		let v = parseInt(line.split(' ')[1]);
		sprite += v;
	}
});

function drawPixel(clock, sprite) {
	let row = Math.floor(clock / 40);
	let col = (clock % 40) - 1;
	if ([sprite - 1, sprite, sprite + 1].includes(col)) {
		result2[row] += '#';
	} else {
		result2[row] += '.';
	}
}

console.log(result2);
