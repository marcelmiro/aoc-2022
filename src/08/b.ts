import rawData from './input'

const data = rawData
	.split('\n')
	.map((row) => row.split('').map((height) => Number(height)))

function getScore(height: number, trees: number[]): number {
	let counter = 0
	for (const tree of trees) {
		counter++
		if (tree >= height) break
	}
	return counter
}

let maxScore = 0

for (let row = 0; row < data.length; row++) {
	const rowTrees = data[row]

	for (let col = 0; col < rowTrees.length; col++) {
		const colTrees = data.map((row) => row[col])

		// Reverse `leftTrees` and `topTrees` as visibility direction from `tree` position is inverse
		const tree = rowTrees[col]
		const leftTrees = rowTrees.slice(0, col).reverse()
		const rightTrees = rowTrees.slice(col + 1)
		const topTrees = colTrees.slice(0, row).reverse()
		const bottomTrees = colTrees.slice(row + 1)

		const score =
			getScore(tree, leftTrees) *
			getScore(tree, rightTrees) *
			getScore(tree, topTrees) *
			getScore(tree, bottomTrees)

		if (score > maxScore) maxScore = score
	}
}

console.log('Max scenic score:', maxScore)
