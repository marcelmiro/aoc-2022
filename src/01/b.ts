import rawData from './data'

const data = rawData.split('\n\n').map((calories) => calories.split('\n'))

const caloriesByElf = data.map((calories) =>
	calories.reduce((sum, calories) => sum + Number(calories), 0)
)

const top3Calories = caloriesByElf
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((sum, totalCalories) => sum + totalCalories, 0)

console.log(top3Calories)
