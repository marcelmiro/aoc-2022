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

// Selected row (y) to record points where beacon cannot be present
const row = 2_000_000

// X values in `row` where beacon cannot be present
const occupiedX = new Set<number>()

for (const { sensor, beacon } of data) {
	const distance =
		Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y)

	if (row >= sensor.y - distance && row <= sensor.y + distance) {
		const xOffset = distance - Math.abs(sensor.y - row)

		for (let i = sensor.x - xOffset; i <= sensor.x + xOffset; i++) {
			occupiedX.add(i)
		}
	}
}

const pointString = (point: Point) => `${point.x}.${point.y}`

// Get list of all sensors and beacons
const points = data
	.map(({ sensor, beacon }) => [pointString(sensor), pointString(beacon)])
	.flat()

// Count points where beacon cannot be present and where a sensor or beacon
// is not already present
const count = Array.from(occupiedX).filter(
	(x) => !points.includes(pointString({ x, y: row }))
).length

console.log('Points where a beacon cannot be present:', count)
