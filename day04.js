const fs = require('fs');
const data = fs.readFileSync('./input/day04.txt', 'utf8').trimEnd();
const raw = data.split(/\r?\n/);

// Part I
let result1 = 0;
const pairs = raw.map((line) => {
	return line.split(',');
});
pairs.forEach((pair) => {
	let a1 = pair[0].split('-').map((a) => parseInt(a));
	let a2 = pair[1].split('-').map((a) => parseInt(a));
	if (
		(a1[0] >= a2[0] && a1[1] <= a2[1]) ||
		(a2[0] >= a1[0] && a2[1] <= a1[1])
	) {
		result1++;
	}
});
console.log(result1);

// Part II
let result2 = 0;
pairs.forEach((pair) => {
	let a1 = pair[0].split('-').map((a) => parseInt(a));
	let a2 = pair[1].split('-').map((a) => parseInt(a));
	if (
		(a2[0] <= a1[1] && a2[1] >= a1[0]) ||
		(a1[0] <= a2[1] && a1[1] >= a2[0])
	) {
		result2++;
	}
});
console.log(result2);
