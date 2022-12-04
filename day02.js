const fs = require('fs');
const data = fs.readFileSync('./input/day02.txt', 'utf8').trimEnd();
const raw = data.split(/\r?\n/);
const rounds = raw.map((line) => line.split(' '));

// Part I
let score1 = 0;
rounds.forEach((r) => {
	let o = r[0];
	let p = r[1];
	switch (o + p) {
		case 'AX':
			score1 += 1 + 3;
			break;
		case 'AY':
			score1 += 2 + 6;
			break;
		case 'AZ':
			score1 += 3 + 0;
			break;
		case 'BX':
			score1 += 1 + 0;
			break;
		case 'BY':
			score1 += 2 + 3;
			break;
		case 'BZ':
			score1 += 3 + 6;
			break;
		case 'CX':
			score1 += 1 + 6;
			break;
		case 'CY':
			score1 += 2 + 0;
			break;
		case 'CZ':
			score1 += 3 + 3;
			break;
		default:
			break;
	}
});

console.log(score1);

// Part II
let score2 = 0;
rounds.forEach((r) => {
	let o = r[0];
	let p = r[1];
	switch (o + p) {
		case 'AX':
			score2 += 3 + 0;
			break;
		case 'AY':
			score2 += 1 + 3;
			break;
		case 'AZ':
			score2 += 2 + 6;
			break;
		case 'BX':
			score2 += 1 + 0;
			break;
		case 'BY':
			score2 += 2 + 3;
			break;
		case 'BZ':
			score2 += 3 + 6;
			break;
		case 'CX':
			score2 += 2 + 0;
			break;
		case 'CY':
			score2 += 3 + 3;
			break;
		case 'CZ':
			score2 += 1 + 6;
			break;
		default:
			break;
	}
});

console.log(score2);
