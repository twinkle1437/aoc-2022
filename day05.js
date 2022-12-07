const fs = require('fs');
const data = fs.readFileSync('./input/day05.txt', 'utf8');
const raw = data.split(/\r?\n/);
const steps = [];
const craneMap = [];
raw.forEach((line) => {
	if (line.includes('[')) {
		let craneArray = [...line];
		for (let i = 1; i < craneArray.length; i += 4) {
			let c = craneArray[i];
			if (c !== ' ') {
				if (!craneMap[(i - 1) / 4]) {
					craneMap[(i - 1) / 4] = [];
				}
				craneMap[(i - 1) / 4].push(c);
			}
		}
	}
	if (line.includes('move')) {
		let s = line.split(' ');
		steps.push([parseInt(s[1]), parseInt(s[3]) - 1, parseInt(s[5]) - 1]);
	}
});
craneMap.map((crane) => {
	return crane.reverse();
});

// Part I
let craneMap1 = craneMap.map(function (arr) {
	return arr.slice();
});
let result1 = '';
steps.forEach((step) => {
	let count = step[0];
	let src = step[1];
	let dest = step[2];
	for (let i = 0; i < count; i++) {
		craneMap1[dest].push(craneMap1[src].pop());
	}
});
craneMap1.forEach((crane) => {
	result1 += crane[crane.length - 1];
});
console.log(result1);

// Part II
let craneMap2 = craneMap.map(function (arr) {
	return arr.slice();
});
let result2 = '';
steps.forEach((step) => {
	let count = step[0];
	let src = step[1];
	let dest = step[2];
	let batch = [];
	for (let i = 0; i < count; i++) {
		batch.push(craneMap2[src].pop());
	}
	craneMap2[dest] = [...craneMap2[dest], ...batch.reverse()];
});
craneMap2.forEach((crane) => {
	result2 += crane[crane.length - 1];
});
console.log(result2);
