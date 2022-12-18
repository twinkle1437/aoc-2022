const fs = require('fs');
const data = fs.readFileSync('./input/day13.txt', 'utf8');
const raw = data.split(/\r?\n/);

let i = 0;
const pairs = [];
raw.forEach((line) => {
	if (line === '') {
		i++;
	} else {
		pairs[i] = pairs[i] ? pairs[i] : [];
		pairs[i].push(JSON.parse(line));
	}
});

// Part I
let result1 = 0;
let rightOrder = [];
let notRightOrder = [];
pairs.forEach((p, index) => {
	const r = comparePair(p[0], p[1]);
	r === 1 ? rightOrder.push(index + 1) : notRightOrder.push[index + 1];
});

rightOrder.forEach((i) => (result1 += i));

console.log(result1);

// Part II
let result2 = 0;
let allRightOrder = [[[2]], [[6]]];
pairs.forEach((p) => {
	allRightOrder.push(p[0]);
	allRightOrder.push(p[1]);
});
allRightOrder = allRightOrder.sort(comparePair).reverse();

let a = allRightOrder.findIndex((line) => JSON.stringify(line) === '[[2]]') + 1;
let b = allRightOrder.findIndex((line) => JSON.stringify(line) === '[[6]]') + 1;

result2 = a * b;
console.log(result2);

function comparePair(left, right) {
	for (let j = 0; ; j++) {
		// left or right run out
		if (left[j] == null) {
			return 1;
		}
		if (right[j] == null) {
			return -1;
		}
		// array vs array
		if (Array.isArray(left[j]) && Array.isArray(right[j])) {
			return comparePair(left[j], right[j]);
		}
		// array vs integer
		if (Array.isArray(left[j])) {
			return comparePair(left[j], [right[j]]);
		}
		// integer vs array
		if (Array.isArray(right[j])) {
			return comparePair([left[j]], right[j]);
		}
		// integer vs integer
		if (left[j] < right[j]) {
			return 1;
		} else if (left[j] > right[j]) {
			return -1;
		} else {
			continue;
		}
	}
}
