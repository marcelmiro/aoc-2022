import rawData from './input'

const data = rawData
	.split('\n')
	.map((row) => row.split('').map((height) => Number(height)))

let counter = 0

for (let row = 0; row < data.length; row++) {
	const rowTrees = data[row]

	for (let col = 0; col < rowTrees.length; col++) {
		const isEdgeTree =
			row === 0 ||
			row === data.length - 1 ||
			col === 0 ||
			col === rowTrees.length - 1

		if (isEdgeTree) {
			counter++
			continue
		}

		const tree = rowTrees[col]

		const leftTrees = rowTrees.slice(0, col)
		if (leftTrees.every((leftTree) => leftTree < tree)) {
			counter++
			continue
		}

		const rightTrees = rowTrees.slice(col + 1)
		if (rightTrees.every((rightTree) => rightTree < tree)) {
			counter++
			continue
		}

		const colTrees = data.map((row) => row[col])

		const topTrees = colTrees.slice(0, row)
		if (topTrees.every((topTree) => topTree < tree)) {
			counter++
			continue
		}

		const bottomTrees = colTrees.slice(row + 1)
		if (bottomTrees.every((bottomTree) => bottomTree < tree)) {
			counter++
			continue
		}
	}
}

console.log('Visible trees:', counter)
