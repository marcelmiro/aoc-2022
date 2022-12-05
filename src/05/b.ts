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
	// Get last `amount` crates of `from` stack, remove them
	// from `from` stack and place them to `to` stack
	const crates = stacks[from - 1].splice(amount * -1, amount)
	stacks[to - 1].push(...crates)
}

const lastCratesOfStacks = stacks
	.map((stack) => stack[stack.length - 1])
	.join('')

console.log(lastCratesOfStacks)
