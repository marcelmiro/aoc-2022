import rawData from './input'

type Point = { x: number; y: number }

const rockEdges = rawData.split('\n').map((line) =>
	line.split(' -> ').map((pos) => {
		const arr = pos.split(',').map(Number)
		return { x: arr[0], y: arr[1] } as Point
	})
)

const pointString = (point: Point) => `${point.x}.${point.y}`

// Get all rock points
const rocks = rockEdges.reduce((points, rock) => {
	for (let i = 1; i < rock.length; i++) {
		const [prev, curr] = rock.slice(i - 1, i + 1)
		if (prev.x !== curr.x) {
			const diff = Math.abs(prev.x - curr.x)
			Array.from(Array(diff + 1), (_, i) =>
				points.add(
					pointString({ x: Math.min(prev.x, curr.x) + i, y: prev.y })
				)
			)
		}
		if (prev.y !== curr.y) {
			const diff = Math.abs(prev.y - curr.y)
			Array.from(Array(diff + 1), (_, i) =>
				points.add(
					pointString({ x: prev.x, y: Math.min(prev.y, curr.y) + i })
				)
			)
		}
	}
	return points
}, new Set<string>())

// Get grid range and dimension
const rocksX = Array.from(rocks, (point) => Number(point.split('.')[0]))
const rocksY = Array.from(rocks, (point) => Number(point.split('.')[1]))

const min: Point = { x: Math.min(...rocksX), y: Math.min(...rocksY) }
const max: Point = { x: Math.max(...rocksX), y: Math.max(...rocksY) }
const dimension: Point = { x: max.x - min.x, y: max.y }

// Point where sand is spawned
const sandSpawn: Point = { x: 500, y: 0 }
const sands = new Set<string>()

// Returns item in `point` (`null` is air)
function getPointItem(point: Point): 'spawn' | 'sand' | 'rock' | null {
	if (point.x === sandSpawn.x && point.y === sandSpawn.y) return 'spawn'
	if (sands.has(pointString(point))) return 'sand'
	if (rocks.has(pointString(point))) return 'rock'
	return null
}

function printScreen() {
	const screen = Array.from(Array(dimension.y + 1), (_, y) =>
		Array.from(Array(dimension.x + 1), (_, i) => {
			const item = getPointItem({ x: min.x + i, y })
			if (item === 'spawn') return '+'
			if (item === 'sand') return 'o'
			return item === 'rock' ? '#' : '.'
		}).join(' ')
	).join('\n')
	console.log('')
	console.log(screen)
}

// Recursive function to get a sand point
function nextSandPoint(point?: Point): Point | null {
	const currPoint = point || sandSpawn

	if (currPoint.y < max.y) {
		// Check point below
		const down: Point = { x: currPoint.x, y: currPoint.y + 1 }
		if (!getPointItem(down)) {
			const point = nextSandPoint(down)
			if (point) return point
		}

		// Check point below to left
		if (currPoint.x > min.x) {
			const diagLeft: Point = { x: currPoint.x - 1, y: currPoint.y + 1 }
			if (!getPointItem(diagLeft)) {
				const point = nextSandPoint(diagLeft)
				if (point) return point
			}
		}

		// Check point below to right
		if (currPoint.x < max.x) {
			const diagRight: Point = { x: currPoint.x + 1, y: currPoint.y + 1 }
			if (!getPointItem(diagRight)) {
				const point = nextSandPoint(diagRight)
				if (point) return point
			}
		}
	}

	// Sand can't move further (`null` if sand can't spawn)
	return point || null
}

let i = 0
let maxUnits = 0

while (maxUnits === 0) {
	const sand = nextSandPoint()

	if (sand) {
		// Check if sand is going to fall to abyss
		if (sand.x === min.x || sand.x === max.x || sand.y === max.y) {
			maxUnits = i
			continue
		}

		sands.add(pointString(sand))
	} else {
		// For debugging as sand in this exercise shouldn't be blocked from spawning
		throw new Error()
	}

	// printScreen()
	i++
}

console.log('Max units:', maxUnits)
