import rawData from './input'

const data = rawData.split('\n').map((line) => line.split(''))

type Pos = { x: number; y: number }

function findPos(char: string): Pos {
	const stringIndex = rawData.replace(/\n/g, '').indexOf(char)
	return {
		x: stringIndex % data[0].length,
		y: Math.floor(stringIndex / data[0].length),
	}
}

const startPos = findPos('S')
const endPos = findPos('E')

const getPosString = (pos: Pos) => `${pos.x}.${pos.y}`

function getElevationDiff(currentPos: Pos, nextPos: Pos): number {
	let currentElevation = data[currentPos.y][currentPos.x]
	let nextElevation = data[nextPos.y][nextPos.x]

	if (currentElevation === 'S') currentElevation = 'a'
	if (currentElevation === 'E') currentElevation = 'z'
	if (nextElevation === 'S') nextElevation = 'a'
	if (nextElevation === 'E') nextElevation = 'z'

	return parseInt(nextElevation, 36) - parseInt(currentElevation, 36)
}

function getAdjacent(pos: Pos) {
	const points: Pos[] = []

	if (pos.x > 0) points.push({ y: pos.y, x: pos.x - 1 })
	if (pos.y > 0) points.push({ x: pos.x, y: pos.y - 1 })
	if (pos.x < data[0].length - 1) points.push({ y: pos.y, x: pos.x + 1 })
	if (pos.y < data.length - 1) points.push({ x: pos.x, y: pos.y + 1 })

	return points.filter((adjPos) => {
		const diff = getElevationDiff(pos, adjPos)
		return diff <= 1
	})
}

// Store all paths to get shortest path to `E`
let paths: string[][] = [[getPosString(startPos)]]

const prevPoints = new Set<string>([getPosString(startPos)])

let steps = 0

while (steps === 0) {
	const newPaths: typeof paths = []

	for (const path of paths) {
		const lastPosArr = path[path.length - 1].split('.').map(Number)
		const lastPos: Pos = { x: lastPosArr[0], y: lastPosArr[1] }

		// Get adjacent points
		const adjPoints = getAdjacent(lastPos)

		// Create paths for each adjacent point
		for (const pos of adjPoints) {
			if (prevPoints.has(getPosString(pos))) continue
			prevPoints.add(getPosString(pos))

			if (pos.x === endPos.x && pos.y === endPos.y) {
				steps = path.length
				break
			}

			newPaths.push([...path, getPosString(pos)])
		}
	}

	paths = newPaths
}

console.log('Steps:', steps)
