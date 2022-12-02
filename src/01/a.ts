import rawData from './data'

const data = rawData.split('\n\n').map((calories) => calories.split('\n'))

const elfWithMostCalories = { index: -1, calories: 0 }

for (const [i, elfCalories] of data.entries()) {
	const totalCalories = elfCalories.reduce(
		(sum, calories) => sum + Number(calories),
		0
	)

	if (totalCalories > elfWithMostCalories.calories) {
		elfWithMostCalories.index = i
		elfWithMostCalories.calories = totalCalories
	}
}

console.log(elfWithMostCalories)
