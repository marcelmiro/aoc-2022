import rawData from './input'

const data = rawData.split('\n').map((line) => line.split(' '))

type Pos = { x: number; y: number }

// Current positions of all knots (including head and tail)
const knotPositions: Pos[] = new Array(10)
	.fill(undefined)
	.map((_) => ({ x: 0, y: 0 }))

// List of positions visited by tail
const tailPositions = new Set<string>()

function addTailPos() {
	const tail = knotPositions[knotPositions.length - 1]
	tailPositions.add(`${tail.x}.${tail.y}`)
}

function areAdjecent(knot1: Pos, knot2: Pos): boolean {
	return (
		knot2.x >= knot1.x - 1 &&
		knot2.x <= knot1.x + 1 &&
		knot2.y >= knot1.y - 1 &&
		knot2.y <= knot1.y + 1
	)
}

// Include initial tail position to `tailPositions`
addTailPos()

for (const [command, steps] of data) {
	for (let i = 0; i < Number(steps); i++) {
		if (command === 'U') knotPositions[0].y += 1
		if (command === 'D') knotPositions[0].y -= 1
		if (command === 'L') knotPositions[0].x -= 1
		if (command === 'R') knotPositions[0].x += 1

		// Loop all knots except head to store all knot positions
		for (let j = 1; j < knotPositions.length; j++) {
			const knot = knotPositions[j]
			const prevKnot = knotPositions[j - 1]

			if (areAdjecent(knot, prevKnot)) continue

			const xDiff = prevKnot.x - knot.x
			if (xDiff > 0) knot.x += 1
			if (xDiff < 0) knot.x -= 1

			const yDiff = prevKnot.y - knot.y
			if (yDiff > 0) knot.y += 1
			if (yDiff < 0) knot.y -= 1
		}

		addTailPos()
	}
}

console.log('Amount of positions visited by tail:', tailPositions.size)
