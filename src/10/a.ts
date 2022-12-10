import rawData from './input'

// Omit command (e.g. noop | addx) as not necessary
const data = rawData
	.split('\n')
	.map((line) => line.split(' ')[1] as string | undefined)

// Cycle number
let cycle = 0

// Register `X`
let X = 1

// Sum of signal strengths
let signalStrengthSum = 0

function nextCycle() {
	cycle++

	// Add to signal strength sum if cycle === 20 | 60 | 100 | 140 | 180 | 220
	if ((cycle - 20) % 40 === 0) signalStrengthSum += cycle * X
}

for (const amount of data) {
	nextCycle()

	if (amount) {
		nextCycle()
		X += Number(amount)
	}
}

console.log('Signal strength sum:', signalStrengthSum)
