import rawData from './input'

const data = rawData.split('\n')

let count = 0

for (const rawPair of data) {
	const pair = rawPair.split(',')

	const [first, second] = pair
		.map((elf) => elf.split('-'))
		.map((elf) => ({ min: Number(elf[0]), max: Number(elf[1]) }))

	if (first.min <= second.max && first.max >= second.min) {
		count++
	}
}

console.log(count)
