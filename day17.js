const fs = require('fs');
const performance = require('perf_hooks').performance;
const eol = require('os').EOL;

let startTime = performance.now();
let part1 = (part2 = 0);
let input = fs
	.readFileSync('./input/day17.txt', 'utf8')
	.split(eol)
	.join('')
	.split('');
let chamber = [['#', '#', '#', '#', '#', '#', '#', '#', '#']];
let segment = ['#', '.', '.', '.', '.', '.', '.', '.', '#'];

let bloks = [
	[['#', '#', '#', '#']],
	[
		['.', '#', '.'],
		['#', '#', '#'],
		['.', '#', '.'],
	],
	[
		['#', '#', '#'],
		['.', '.', '#'],
		['.', '.', '#'],
	],
	[['#'], ['#'], ['#'], ['#']],
	[
		['#', '#'],
		['#', '#'],
	],
];
let steps = 1000000000000;
let blockIndex = 0;
let numBlocks = bloks.length;
let numjets = input.length;
let topIndex = 1;
let jetIndex = 0;

function colides(block, blockX, blockY) {
	return block.some((r, y) => {
		return r.some((state, x) => {
			return state == '#' && chamber[blockY + y][blockX + x] == '#';
		});
	});
}

function checkRepeat() {
	let l = topIndex - 1;
	let max = ~~(chamber.length / 2) - 5;
	let len = max;
	for (len; len > input.length / 5; len--) {
		let same = true;
		for (let i = 0; i < len; i++) {
			if (
				!chamber[l - i].every(
					(el, ix) => el === chamber[l - (i + len)][ix]
				)
			) {
				same = false;
				break;
			}
		}
		if (same) {
			return len;
		}
	}
	return -1;
}
let repeatFound = false;
let repeatLength = 0;
let repeatNext = 0;
let repeatStep = 0;
let mult = 0;
while (steps--) {
	let block = bloks[blockIndex];
	let blockHeight = block.length;
	let blockY = topIndex + 3;
	let blockX = 3;
	while (blockY + blockHeight > chamber.length) {
		chamber.push(segment.slice());
	}

	while (true) {
		let jet = input[jetIndex++ % numjets] == '<' ? -1 : +1;
		if (!colides(block, blockX + jet, blockY)) blockX += jet;
		if (!colides(block, blockX, blockY - 1)) {
			blockY--;
		} else {
			block.forEach((r, y) => {
				r.forEach((state, x) => {
					if (state == '#') chamber[blockY + y][blockX + x] = state;
				});
			});
			topIndex = Math.max(blockY + blockHeight, topIndex);
			break;
		}
	}
	if (mult === 0) {
		if (!repeatFound) {
			let repeat = checkRepeat();
			if (repeat != -1) {
				repeatFound = true;
				repeatNext = topIndex + repeat;
				repeatLength = repeat;
				repeatStep = steps;
			}
		} else if (repeatNext == topIndex) {
			repeatStep = repeatStep - steps;
			mult = Math.floor(steps / repeatStep);
			let rest = steps % repeatStep;
			steps = rest;
		}
	}
	if (1000000000000 - steps == 2022) part1 = topIndex - 1;
	if (++blockIndex == numBlocks) blockIndex = 0;
}
let part2 = topIndex - 1 + mult * repeatLength;
let time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nTimer: ${time} ms`);
