const fs = require('fs');
const data = fs.readFileSync('./input/day06.txt', 'utf8');

// Part I
let result1;
for (let i = 0; i < data.length - 4 && !result1; i++) {
	let fourChar = data.slice(i, i + 4);
	let uniq = [...new Set(fourChar)];
	if (uniq.length === 4) {
		result1 = i + 4;
	}
}
console.log(result1);

// Part II
let result2;
for (let i = 0; i < data.length - 14 && !result2; i++) {
	let fourChar = data.slice(i, i + 14);
	let uniq = [...new Set(fourChar)];
	if (uniq.length === 14) {
		result2 = i + 14;
	}
}
console.log(result2);
