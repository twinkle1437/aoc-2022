const fs = require('fs');
const data = fs.readFileSync('./input/day09.txt', 'utf8');
const raw = data.split(/\r?\n/);

const moveMap = {
	U: [0, 1],
	D: [0, -1],
	L: [-1, 0],
	R: [1, 0],
};

//Part I
let visited1 = new Set();
let H1 = [50, 50];
let T1 = [50, 50];
raw.forEach((line) => {
	let move = line.split(' ');
	let direction = move[0];
	let distance = parseInt(move[1]);
	switch (direction) {
		case 'U':
			for (let i = 0; i <= distance - 1; i++) {
				H1[1] += 1;
				if (H1[1] - T1[1] === 2) {
					visited1.add(`(${H1[0]},${H1[1] - 1})`);
					T1 = [H1[0], H1[1] - 1];
				}
			}
			break;
		case 'D':
			for (let i = 0; i <= distance - 1; i++) {
				H1[1] -= 1;
				if (T1[1] - H1[1] === 2) {
					visited1.add(`(${H1[0]},${H1[1] + 1})`);
					T1 = [H1[0], H1[1] + 1];
				}
			}
			break;
		case 'L':
			for (let i = 0; i <= distance - 1; i++) {
				H1[0] -= 1;
				if (T1[0] - H1[0] === 2) {
					visited1.add(`(${H1[0] + 1},${H1[1]})`);
					T1 = [H1[0] + 1, H1[1]];
				}
			}
			break;
		case 'R':
			for (let i = 0; i <= distance - 1; i++) {
				H1[0] += 1;
				if (H1[0] - T1[0] === 2) {
					visited1.add(`(${H1[0] - 1},${H1[1]})`);
					T1 = [H1[0] - 1, H1[1]];
				}
			}
			break;
		default:
			break;
	}
});

console.log(visited1.size);

// Part II
let visited2 = new Set();
let knots = Array(10).fill([50, 50]);
raw.forEach((line) => {
	let move = line.split(' ');
	let direction = move[0];
	let distance = parseInt(move[1]);
	for (let i = 0; i <= distance - 1; i++) {
		moveKnots(knots, direction);
	}
});

console.log(visited2.size);

function moveKnots(knots, direction) {
	let k = knots;
	for (let i = 0; i < 10; i++) {
		if (i === 0) {
			k[i] = [
				k[i][0] + moveMap[direction][0],
				k[i][1] + moveMap[direction][1],
			];
		} else {
			if (Math.abs(k[i - 1][0] - k[i][0]) === 2) {
				let x =
					k[i - 1][0] > k[i][0] ? k[i - 1][0] - 1 : k[i - 1][0] + 1;
				k[i] = [x, k[i - 1][1]];
			} else if (Math.abs(k[i - 1][1] - k[i][1]) === 2) {
				let y =
					k[i - 1][1] > k[i][1] ? k[i - 1][1] - 1 : k[i - 1][1] + 1;
				k[i] = [k[i - 1][0], y];
			}
			if (i === 9) {
				visited2.add(`(${k[i][0]},${k[i][1]})`);
			}
		}
	}
}
