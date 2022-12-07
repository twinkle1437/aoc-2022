const fs = require('fs');
const data = fs.readFileSync('./input/day07.txt', 'utf8');
const raw = data.split(/\r?\n/);

let dirSizeMap = {};
let paths = [];
raw.forEach((line) => {
	if (line.includes('$ cd')) {
		let dir = line.split(' ')[2];
		switch (dir) {
			case '/':
				paths.push('/');
				break;
			case '..':
				paths.pop();
				break;
			default:
				let path =
					paths[paths.length - 1] === '/'
						? ''
						: `${paths[paths.length - 1]}/`;
				paths.push(`${path}${dir}`);
				break;
		}
	} else {
		let item = line.split(' ');
		if (item[0] !== 'dir' && item[0] !== '$') {
			for (p of paths) {
				dirSizeMap[p] = dirSizeMap[p] ? dirSizeMap[p] : 0;
				dirSizeMap[p] += parseInt(item[0]);
			}
		}
	}
});

// Part I
let result1 = 0;
for (s in dirSizeMap) {
	if (dirSizeMap[s] <= 100000) {
		result1 += dirSizeMap[s];
	}
}
console.log(result1);

// Part II
let result2 = dirSizeMap['/'];
let diff = 30000000 - (70000000 - dirSizeMap['/']);
for (s in dirSizeMap) {
	if (dirSizeMap[s] >= diff && dirSizeMap[s] < result2) {
		result2 = dirSizeMap[s];
	}
}
console.log(result2);
