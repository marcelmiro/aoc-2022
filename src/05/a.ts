import rawData from './input'

const [rawCrates, rawInstructions] = rawData
	.split('\n\n')
	.map((section) => section.split('\n'))

rawCrates.pop() // Remove unnecessary row

// Generate array of crate stacks
const crateCols = Math.floor(rawCrates[0].length + 1) / 4

const stacks: (string | undefined)[][] = []

for (let i = 0; i < crateCols; i++) {
	// Get crates from stack `i`
	const stack = rawCrates
		.map((row) => {
			const value = row[i * 4 + 1] // Index of crate value position
			return value === ' ' ? undefined : value
		})
		.filter((crate) => crate) // Remove undefined crates
		.reverse() // Reverse array to imitate stack data type (first value in array is bottom value in stack)

	stacks.push(stack)
}

const instructions = rawInstructions
	.map((i) => i.split(/[^\d+]/g).filter(Boolean))
	.map((arr) => ({
		amount: Number(arr[0]),
		from: Number(arr[1]),
		to: Number(arr[2]),
	}))

for (const { amount, from, to } of instructions) {
	// Loop removal and placement of each crate to imitate stack functioning
	for (let i = 0; i < amount; i++) {
		const crate = stacks[from - 1].pop()
		if (crate) stacks[to - 1].push(crate)
	}
}

const lastCratesOfStacks = stacks
	.map((stack) => stack[stack.length - 1])
	.join('')

console.log(lastCratesOfStacks)
