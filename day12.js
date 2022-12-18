const fs = require('fs');
const performance = require('perf_hooks').performance;
const eol = require('os').EOL;

let startTime = performance.now();
let part1 = (part2 = Infinity);
let input = fs.readFileSync('./input/day12.txt', 'utf8').split(eol);

const edges = [
	[0, -1],
	[0, 1],
	[-1, 0],
	[1, 0],
];
let start, end;
// create a 2d array with all the nodes
let map = input.map((row, y) => {
	return row.split('').map((char, x) => {
		let node = {
			x,
			y,
			visited: false,
			height: char.charCodeAt(0) - 96,
			distance: Infinity,
			edgeNodes: [],
		};
		if (char == 'S') (node.height = 1), (start = node);
		if (char == 'E') (node.height = 26), (end = node);
		return node;
	});
});
// calculate all connected nodes per node
map.forEach((r) => {
	r.forEach((node) => {
		edges.forEach((edge) => {
			if (map[node.y + edge[1]]) {
				let n = map[node.y + edge[1]][node.x + edge[0]];
				n && node.edgeNodes.push(n);
			}
		});
	});
});
// calculate length of shortest path
function solve(n) {
	n.distance = 0;
	let queue = [n];
	let solution = Array(2).fill(-1);
	while (queue.length) {
		let node = queue.shift();
		for (const edge of node.edgeNodes) {
			if (!edge.visited && node.height - edge.height < 2) {
				let distance = node.distance + 1;
				if (edge.x == 0 && edge.y == start.y && solution[0] == -1) {
					solution[0] = distance;
				} else if (edge.x == 0 && solution[1] == -1) {
					solution[1] = distance;
				}
				edge.visited = true;
				edge.distance = distance;
				queue.push(edge);
				if (solution.indexOf(-1) == -1) return solution;
			}
		}
	}
	return solution;
}

[part1, part2] = solve(end);
let time = performance.now() - startTime;
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nTimer: ${time} ms`);
