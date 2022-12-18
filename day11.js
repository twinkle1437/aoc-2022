const fs = require('fs');
const data = fs.readFileSync('./input/day11.txt', 'utf8');
const raw = data.split(/\r?\n/);

const monkeys = [];
const monkeys2 = [];
const activeMap = Array(8).fill(0);
const activeMap2 = Array(8).fill(0);

raw.forEach((line) => {
	if (line.includes('Starting items')) {
		monkeys.push(line.split(': ')[1].split(', ').map(Number));
		monkeys2.push(line.split(': ')[1].split(', ').map(Number));
	}
});

// Part I
let result1 = 0;
for (let r = 0; r < 20; r++) {
	processRound(monkeys);
}
let sortedActive = activeMap.sort((a, b) => b - a);
result1 = sortedActive[0] * sortedActive[1];
console.log(result1);

// Part II
let result2 = 0;
for (let r = 0; r < 10000; r++) {
	processRound2(monkeys2);
}
let sortedActive2 = activeMap2.sort((a, b) => b - a);
result2 = sortedActive2[0] * sortedActive2[1];
console.log(result2);

function processRound(monkeys) {
	monkeys.forEach((m, i) => {
		switch (i) {
			case 0:
				m.forEach((w) => {
					activeMap[i]++;
					w = Math.floor((w * 13) / 3);
					if (w % 5 === 0) {
						monkeys[1].push(w);
					} else {
						monkeys[6].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 1:
				m.forEach((w) => {
					activeMap[i]++;
					w = Math.floor((w + 3) / 3);
					if (w % 7 === 0) {
						monkeys[5].push(w);
					} else {
						monkeys[3].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 2:
				m.forEach((w) => {
					activeMap[i]++;
					w = Math.floor((w * w) / 3);
					if (w % 13 === 0) {
						monkeys[0].push(w);
					} else {
						monkeys[6].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 3:
				m.forEach((w) => {
					activeMap[i]++;
					w = Math.floor((w + 5) / 3);
					if (w % 11 === 0) {
						monkeys[5].push(w);
					} else {
						monkeys[7].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 4:
				m.forEach((w) => {
					activeMap[i]++;
					w = Math.floor((w + 7) / 3);
					if (w % 3 === 0) {
						monkeys[2].push(w);
					} else {
						monkeys[0].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 5:
				m.forEach((w) => {
					activeMap[i]++;
					w = Math.floor((w + 4) / 3);
					if (w % 2 === 0) {
						monkeys[4].push(w);
					} else {
						monkeys[7].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 6:
				m.forEach((w) => {
					activeMap[i]++;
					w = Math.floor((w * 19) / 3);
					if (w % 17 === 0) {
						monkeys[1].push(w);
					} else {
						monkeys[3].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 7:
				m.forEach((w) => {
					activeMap[i]++;
					w = Math.floor((w + 2) / 3);
					if (w % 19 === 0) {
						monkeys[2].push(w);
					} else {
						monkeys[4].push(w);
					}
				});
				monkeys[i] = [];
				break;
			default:
				break;
		}
	});
}

function processRound2(monkeys) {
	let d = 5 * 7 * 13 * 11 * 3 * 2 * 17 * 19;
	monkeys.forEach((m, i) => {
		switch (i) {
			case 0:
				m.forEach((w) => {
					activeMap2[i]++;
					w = (w * 13) % d;
					if (w % 5 === 0) {
						monkeys[1].push(w);
					} else {
						monkeys[6].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 1:
				m.forEach((w) => {
					activeMap2[i]++;
					w = (w + 3) % d;
					if (w % 7 === 0) {
						monkeys[5].push(w);
					} else {
						monkeys[3].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 2:
				m.forEach((w) => {
					activeMap2[i]++;
					w = (w * w) % d;
					if (w % 13 === 0) {
						monkeys[0].push(w);
					} else {
						monkeys[6].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 3:
				m.forEach((w) => {
					activeMap2[i]++;
					w = (w + 5) % d;
					if (w % 11 === 0) {
						monkeys[5].push(w);
					} else {
						monkeys[7].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 4:
				m.forEach((w) => {
					activeMap2[i]++;
					w = (w + 7) % d;
					if (w % 3 === 0) {
						monkeys[2].push(w);
					} else {
						monkeys[0].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 5:
				m.forEach((w) => {
					activeMap2[i]++;
					w = (w + 4) % d;
					if (w % 2 === 0) {
						monkeys[4].push(w);
					} else {
						monkeys[7].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 6:
				m.forEach((w) => {
					activeMap2[i]++;
					w = (w * 19) % d;
					if (w % 17 === 0) {
						monkeys[1].push(w);
					} else {
						monkeys[3].push(w);
					}
				});
				monkeys[i] = [];
				break;
			case 7:
				m.forEach((w) => {
					activeMap2[i]++;
					w = (w + 2) % d;
					if (w % 19 === 0) {
						monkeys[2].push(w);
					} else {
						monkeys[4].push(w);
					}
				});
				monkeys[i] = [];
				break;
			default:
				break;
		}
	});
}
