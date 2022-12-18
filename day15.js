const fs = require('fs');
const data = fs.readFileSync('./input/day15.txt', 'utf8');
const raw = data.split(/\r?\n/);
const sbMap = raw.map((line) => {
	let sbRaw = line.split(': ');
	return sbRaw.map((sb) => {
		let x, y;
		let xy = sb.match(/x=-?\d+, y=-?\d+/g)[0].split(', ');
		x = parseInt(xy[0].split('=')[1]);
		y = parseInt(xy[1].split('=')[1]);
		return [x, y];
	});
});

// Part I
let left = 2000000,
	right = 0;
let result1 = 0;
sbMap.forEach((sb) => {
	let distance =
		Math.abs(sb[0][0] - sb[1][0]) + Math.abs(sb[0][1] - sb[1][1]);
	scanBeacons(sb[0], distance, 2000000);
});

// Remove the one Beacon x=1174860, y=2000000
result1 = right - left + 1 - 1;
console.log(result1);

// Part II
let result2 = 0;
for (let i = 0; i <= 4000000; i++) {
	left = 4000000;
	right = 0;
	let targetRow = [];
	sbMap.forEach((sb) => {
		let distance =
			Math.abs(sb[0][0] - sb[1][0]) + Math.abs(sb[0][1] - sb[1][1]);
		scanBeacons(sb[0], distance, i, targetRow);
	});
	// Sort the ranges first, then find the gap position
	const sortedRanges = targetRow.sort(function (r1, r2) {
		if (r1[0] == r2[0]) return 0;
		return Number(r1[0]) < Number(r2[0]) ? -1 : 1;
	});
	let x = findUncoveredColumn(sortedRanges);
	if (x) {
		result2 = x * 4000000 + i;
		console.log(result2);
	}
}

function scanBeacons(sensor, distance, target, targetRow) {
	let toTarget = Math.abs(target - sensor[1]);
	if (toTarget <= distance) {
		let l = sensor[0] - distance + toTarget;
		let r = sensor[0] + distance - toTarget;
		if (targetRow) {
			targetRow.push([l, r]);
		}
		if (l < left) left = l;
		if (r > right) right = r;
	}
}

function findUncoveredColumn(ranges) {
	let [_, end] = ranges[0];
	for (let i = 1; i < ranges.length; i++) {
		const [range_start, range_end] = ranges[i];
		if (range_start > end) {
			return range_start - 1;
		} else if (range_end > end) {
			end = range_end;
		}
	}
	return null;
}
