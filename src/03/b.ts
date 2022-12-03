import rawData from './input'

const data = rawData.split('\n').reduce(function (arr: string[][], sack, i) {
	const groupIndex = Math.floor(i / 3)
	if (!arr[groupIndex]) arr[groupIndex] = [sack]
	else arr[groupIndex].push(sack)
	return arr
}, [])

function letterToNumber(letter: string) {
	const isUpperCase = letter === letter.toUpperCase()
	const num = parseInt(letter, 36) - 9 // 9 is first number when letter === 'a'
	return isUpperCase ? num + 26 : num // `parseInt` function doesn't check letter case
}

let count = 0

for (const group of data) {
	let badge = ''

	for (const item of group[0]) {
		if (!group[1].includes(item) || !group[2].includes(item)) continue
		badge = item
	}

	if (!badge) break
	count += letterToNumber(badge)
}

console.log(count)
