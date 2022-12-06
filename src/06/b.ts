import input from './input'

const MESSAGE_LENGTH = 14

for (let i = 0; i < input.length; i++) {
	const chars = input.slice(i, i + MESSAGE_LENGTH)
	const charSet = new Set(chars)

	if (charSet.size === MESSAGE_LENGTH) {
		console.log(
			'Characters processed until first message:',
			i + MESSAGE_LENGTH
		)
		break
	}
}
