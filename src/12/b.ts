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

function getElevation(pos: Pos) {
	let elevation = data[pos.y][pos.x]
	if (elevation === 'S') elevation = 'a'
	if (elevation === 'E') elevation = 'z'
	return parseInt(elevation, 36) - 9
}

function getAdjacent(pos: Pos) {
	const points: Pos[] = []

	if (pos.x > 0) points.push({ y: pos.y, x: pos.x - 1 })
	if (pos.y > 0) points.push({ x: pos.x, y: pos.y - 1 })
	if (pos.x < data[0].length - 1) points.push({ y: pos.y, x: pos.x + 1 })
	if (pos.y < data.length - 1) points.push({ x: pos.x, y: pos.y + 1 })

	return points.filter((adjPos) => {
		const diff = getElevation(adjPos) - getElevation(pos)
		return diff <= 1
	})
}

// Store all paths to get shortest path to `E`
let paths: string[][] = [[getPosString(startPos)]]

const prevPoints = new Set<string>([getPosString(startPos)])

let selectedPath: string[] = []

while (paths.length !== 0) {
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
				selectedPath = path
				break
			}

			newPaths.push([...path, getPosString(pos)])
		}
	}

	paths = newPaths
}

const stepsFromDesiredStartPos =
	selectedPath
		.reverse()
		.map((posString) => {
			const arr = posString.split('.').map(Number)
			return { x: arr[0], y: arr[1] } as Pos
		})
		.findIndex((pos) => getElevation(pos) === 1) + 1

console.log('Steps:', stepsFromDesiredStartPos)
