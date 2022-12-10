import rawData from './input'

// Omit command (e.g. noop | addx) as not necessary
const data = rawData
	.split('\n')
	.map((line) => line.split(' ')[1] as string | undefined)

// Cycle number
let cycle = 0

// Register `X`
let X = 1

// List of drawn pixels
let drawing = ''

function nextCycle() {
	cycle++

	// Pixel position relative to screen row (row width === 40px)
	const pixelPos = (cycle - 1) % 40

	drawing += pixelPos >= X - 1 && pixelPos <= X + 1 ? '#' : '.'
}

for (const amount of data) {
	nextCycle()

	if (amount) {
		nextCycle()
		X += Number(amount)
	}
}

// Generate screen from `drawing`
const screen = drawing
	.split('')
	.reduce<string[]>((screen, pixel, i) => {
		// Group pixels by subgroups of 40 pixels wide
		const row = Math.floor(i / 40)
		if (!screen[row]) screen[row] = ''
		screen[row] += pixel
		return screen
	}, [])
	.join('\n')

console.log('Generated screen:')
console.log(screen)
// Answer: RKPJBPLA
