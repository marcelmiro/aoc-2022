import rawData from './input'

const data = rawData.split('\n').map((line) => line.split(' '))

type Pos = { x: number; y: number }

const headPos: Pos = { x: 0, y: 0 }
const tailPos: Pos = { x: 0, y: 0 }

// List of positions visited by tail
const tailPositions = new Set<string>()

function addTailPos(pos: Pos) {
	tailPositions.add(`${pos.x}.${pos.y}`)
}

function areAdjecent(head: Pos, tail: Pos): boolean {
	return (
		tail.x >= head.x - 1 &&
		tail.x <= head.x + 1 &&
		tail.y >= head.y - 1 &&
		tail.y <= head.y + 1
	)
}

// Include initial tail position to `tailPositions`
addTailPos(tailPos)

for (const [command, steps] of data) {
	for (let i = 0; i < Number(steps); i++) {
		if (command === 'U') headPos.y += 1
		if (command === 'D') headPos.y -= 1
		if (command === 'L') headPos.x -= 1
		if (command === 'R') headPos.x += 1

		if (areAdjecent(headPos, tailPos)) continue

		const xDiff = headPos.x - tailPos.x
		if (xDiff > 0) tailPos.x += 1
		if (xDiff < 0) tailPos.x -= 1

		const yDiff = headPos.y - tailPos.y
		if (yDiff > 0) tailPos.y += 1
		if (yDiff < 0) tailPos.y -= 1

		addTailPos(tailPos)
	}
}

console.log('Amount of positions visited by tail:', tailPositions.size)
