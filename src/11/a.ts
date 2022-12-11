import rawData from './input'

const monkeys = rawData.split('\n\n').map((monkey) => {
	// Parse item list
	const itemStringIndex = monkey.indexOf('items: ') + 7
	const itemString = monkey.substring(
		itemStringIndex,
		monkey.indexOf('\n', itemStringIndex)
	)
	const items = itemString?.split(', ').map(Number)
	if (!items) throw new Error()

	// Parse operation
	const operationStringIndex = monkey.indexOf('new = ') + 6
	const operationArray = monkey
		.substring(
			operationStringIndex,
			monkey.indexOf('\n', operationStringIndex)
		)
		.split(' ')

	const operation = (worry: number) => {
		const num1 = Number(operationArray[0]) || worry
		const num2 = Number(operationArray[2]) || worry
		const operator = operationArray[1]

		if (operator === '+') return num1 + num2
		if (operator === '-') return num1 - num2
		if (operator === '*') return num1 * num2
		if (operator === '/') return num1 / num2
		throw new Error()
	}

	// Parse action
	const actionArray = monkey
		.match(/throw to monkey (\d+)/gi)
		?.map((str) => Number(str.slice(16)))
	if (!actionArray || actionArray.length < 2) throw new Error()
	const action = { true: actionArray[0], false: actionArray[1] }

	// Parse condition
	const conditionStringIndex = monkey.indexOf('divisible by ') + 13
	const divisor = parseInt(monkey.slice(conditionStringIndex))
	if (!divisor) throw new Error()

	const condition = (worry: number) => {
		const res = worry % divisor === 0
		return action[`${res}`]
	}

	return { items, operation, condition, divisor }
})

let counter: number[] = new Array(monkeys.length).fill(0)

for (let i = 0; i < 20; i++) {
	for (const [j, monkey] of monkeys.entries()) {
		const itemLength = monkey.items.length
		if (itemLength === 0) continue

		for (let k = 0; k < itemLength; k++) {
			counter[j]++
			const worry = Math.floor(monkey.operation(monkey.items[0]) / 3)
			const newMonkey = monkey.condition(worry)
			monkeys[newMonkey].items.push(worry)
			monkey.items.shift()
		}
	}
}

// Sort `counter` to get top 2 monkeys
counter = counter.sort((a, b) => b - a)

console.log('Monkey business level:', counter[0] * counter[1])
