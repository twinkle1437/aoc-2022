const fs = require('fs');
const data = fs.readFileSync('./input/day01.txt', 'utf8').trimEnd();
const raw = data.split(/\r?\n/);
const calories = raw.map((line) => parseInt(line));

// Part 1
let sum = 0;
let caloryArray = [];
calories.forEach((c) => {
	if (c) {
		sum += c;
	} else {
		caloryArray.push(sum);
		sum = 0;
	}
});
const sorted = caloryArray.sort().reverse();
console.log(sorted[0]);

// Part II
console.log(sorted[0] + sorted[1] + sorted[2]);
