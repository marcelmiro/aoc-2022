import rawData from './input'

const data = rawData.split('\n')

function letterToNumber(letter: string) {
	const isUpperCase = letter === letter.toUpperCase()
	const num = parseInt(letter, 36) - 9 // 9 is first number when letter === 'a'
	return isUpperCase ? num + 26 : num // `parseInt` function isn't case-sensitive
}

let count = 0

for (const sack of data) {
	const halfIndex = Math.floor(sack.length / 2)
	const compartment1 = sack.slice(0, halfIndex)
	const compartment2 = sack.slice(halfIndex, sack.length)

	let repeatedItem = ''

	for (const item of compartment1) {
		if (!compartment2.includes(item)) continue
		repeatedItem = item
	}

	if (!repeatedItem) break
	count += letterToNumber(repeatedItem)
}

console.log(count)
