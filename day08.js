const fs = require('fs');
const data = fs.readFileSync('./input/day08.txt', 'utf8');
const raw = data.split(/\r?\n/);

const forest = [];
raw.forEach((line) => {
	forest.push([...line].map(Number));
});

// Part I
let result1 = 0;
let rowSize = forest.length;
let colSize = forest[0].length;
for (let row = 0; row < rowSize; row++) {
	for (let col = 0; col < colSize; col++) {
		if (
			row === 0 ||
			col === 0 ||
			row === rowSize - 1 ||
			col === colSize - 1
		) {
			result1++;
		} else {
			let tree = forest[row][col];
			let column = [];
			for (let i = 0; i < rowSize; i++) {
				column.push(forest[i][col]);
			}
			let topH = Math.max(...column.slice(0, row));
			let bottomH = Math.max(...column.slice(row + 1, rowSize));
			let leftH = Math.max(...forest[row].slice(0, col));
			let rightH = Math.max(...forest[row].slice(col + 1, colSize));
			if (
				tree > topH ||
				tree > bottomH ||
				tree > leftH ||
				tree > rightH
			) {
				result1++;
			}
		}
	}
}
console.log(result1);

// Part II
let result2 = 0;
for (let row = 0; row < rowSize; row++) {
	for (let col = 0; col < colSize; col++) {
		let tree = forest[row][col];
		let column = [];
		for (let i = 0; i < rowSize; i++) {
			column.push(forest[i][col]);
		}
		let topTrees = column.slice(0, row).reverse();
		let bottomTrees = column.slice(row + 1, rowSize);
		let leftTrees = forest[row].slice(0, col).reverse();
		let rightTrees = forest[row].slice(col + 1, colSize);
		let top = calculateDistance(topTrees, tree);
		let bottom = calculateDistance(bottomTrees, tree);
		let left = calculateDistance(leftTrees, tree);
		let right = calculateDistance(rightTrees, tree);
		let score = top * bottom * left * right;
		result2 = score > result2 ? score : result2;
	}
}

console.log(result2);

function calculateDistance(trees, tree) {
	let r = 0;
	trees.every((t) => {
		if (tree > t) {
			r++;
			return true;
		} else {
			r++;
			return false;
		}
	});
	return r;
}
