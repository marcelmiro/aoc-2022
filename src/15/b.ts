import input from './input'

type Point = { x: number; y: number }

type Data = { sensor: Point; beacon: Point }[]

const data: Data = input.split('\n').map((line) => {
	line = line.replace(/Sensor at x=|\sy=|\sclosest beacon is at x=/g, '')

	const [sensor, beacon] = line
		.split(':')
		.map((point) => point.split(',').map(Number))

	return {
		sensor: { x: sensor[0], y: sensor[1] },
		beacon: { x: beacon[0], y: beacon[1] },
	}
})

// Grid x and y dimensions
const min = 0
const max = 4_000_000

// Manhattan distance
function getDistance(point1: Point, point2: Point): number {
	return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y)
}

// Check if distress beacon is in `point`
function isDistressBeacon(point: Point): boolean {
	const isOffGrid =
		point.x < min || point.y < min || point.x > max || point.y > max

	if (isOffGrid) return false

	// Check if `point` is not a possible position for a beacon to be present
	for (const { sensor, beacon } of data) {
		const isPointFurtherThanBeacon =
			getDistance(point, sensor) > getDistance(sensor, beacon)

		if (!isPointFurtherThanBeacon) return false
	}

	return true
}

let tuningFreq = 0

// As there's only 1 possible position for the distress signal, the position must
// be adjacent to at least 1 area of a sensor where its beacon could be present.
// Therefore, the distress beacon can be found by checking the perimeter of each
// sensor.
for (const { sensor, beacon } of data) {
	// Add `1` to get the outside of `sensor`'s perimeter (i.e. the points adjacent
	// to the perimeter where `beacon` is not present)
	const distance = getDistance(sensor, beacon) + 1

	const perimeter: Point[] = []

	// Get perimeter points for `sensor`
	for (let i = 0; i <= distance; i++) {
		perimeter.push({ x: sensor.x + i, y: sensor.y - distance + i })
		perimeter.push({ x: sensor.x - i, y: sensor.y - distance + i })
		perimeter.push({ x: sensor.x + i, y: sensor.y + distance - i })
		perimeter.push({ x: sensor.x - i, y: sensor.y + distance - i })
	}

	const distressBeacon = perimeter.find(isDistressBeacon)
	if (!distressBeacon) continue

	tuningFreq = distressBeacon.x * 4_000_000 + distressBeacon.y
	break
}

console.log("Distress beacon's tuning frequency:", tuningFreq)
