const fs = require('fs');
const data = fs.readFileSync('./input/day03.txt', 'utf8').trimEnd();
const raw = data.split(/\r?\n/);

const alphabet1 = Array.from(Array(26))
	.map((e, i) => {
		return i + 97;
	})
	.map((x) => String.fromCharCode(x));
const alphabet2 = Array.from(Array(26))
	.map((e, i) => {
		return i + 65;
	})
	.map((x) => String.fromCharCode(x));
const alphabet = alphabet1.concat(alphabet2);
const priorityMap = {};
alphabet.forEach((v, k) => {
	priorityMap[v] = k + 1;
});

// Part I
let result1 = 0;
const rucksacks = raw.map((line) => {
	return [
		line.slice(0, line.length / 2),
		line.slice(line.length / 2, line.length),
	];
});
rucksacks.forEach((rs) => {
	[...rs[1]].every((item) => {
		if (rs[0].includes(item)) {
			result1 += priorityMap[item];
			return false;
		}
		return true;
	});
});
console.log(result1);

// Part II
let result2 = 0;
let groups = [];
raw.forEach((line, i) => {
	let g = Math.floor(i / 3);
	if (groups[g]) {
		groups[g].push(line);
	} else {
		groups[g] = [];
		groups[g].push(line);
	}
});
groups.forEach((group) => {
	let commons = [];
	[...group[1]].forEach((item1) => {
		if (group[0].includes(item1)) {
			commons.push(item1);
		}
	});
	[...group[2]].every((item2) => {
		if (commons.includes(item2)) {
			result2 += priorityMap[item2];
			return false;
		}
		return true;
	});
});
console.log(result2);
