import rawData from './input'

const data = rawData
	.split('\n\n')
	.map((pair) => pair.split('\n').map((packet) => JSON.parse(packet)))

type Value = number | Value[]

// Compare 2 values - Returns `boolean` if values are known to be in right
// or wrong order and `null` if next inputs in pair should be checked
function compare(left: Value, right: Value): boolean | null {
	// Both integers
	if (typeof left === 'number' && typeof right === 'number') {
		return left === right ? null : left < right
	}

	// Both arrays
	if (Array.isArray(left) && Array.isArray(right)) {
		if (left.length === 0 && right.length === 0) return null
		if (left.length === 0) return true
		if (right.length === 0) return false

		for (let i = 0; i < Math.max(left.length, right.length); i++) {
			// Return if array runs out of items
			if (left[i] === undefined) return true
			if (right[i] === undefined) return false

			const res = compare(left[i], right[i])
			if (typeof res === 'boolean') return res
		}

		// Check next inputs in pair
		return null
	}

	// One type of each
	if (!Array.isArray(left)) left = [left]
	if (!Array.isArray(right)) right = [right]
	return compare(left, right)
}

let sum = 0

for (let i = 0; i < data.length; i++) {
	const [left, right] = data[i]
	const order = compare(left, right)
	if (order === true) sum += i + 1
}

console.log('Sum of valid pair indices:', sum)
