import input from './input'

const MARKER_LENGTH = 4

for (let i = 0; i < input.length; i++) {
	const chars = input.slice(i, i + MARKER_LENGTH)
	const charSet = new Set(chars)

	if (charSet.size === MARKER_LENGTH) {
		console.log(
			'Characters processed until first marker:',
			i + MARKER_LENGTH
		)
		break
	}
}
