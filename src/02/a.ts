import rawData from './data'

const options = ['rock', 'paper', 'scissors'] as const
type Option = typeof options[number]

const inputToOption = {
	A: 'rock',
	B: 'paper',
	C: 'scissors',
	X: 'rock',
	Y: 'paper',
	Z: 'scissors',
} satisfies Record<string, Option>

const data = rawData
	.split('\n')
	.map((round) =>
		round
			.split(' ')
			.map((input) => inputToOption[input as keyof typeof inputToOption])
	)

function getRoundOutcome(opp: Option, my: Option): number {
	if (opp === my) return 3
	if (my === 'rock') {
		if (opp === 'paper') return 0
		else return 6
	}
	if (my === 'paper') {
		if (opp === 'rock') return 6
		else return 0
	}
	if (opp === 'paper') return 6
	return 0
}

let totalScore = 0

for (const round of data) {
	const [opponentPlay, myPlay] = round

	const optionScore = myPlay === 'rock' ? 1 : myPlay === 'paper' ? 2 : 3
	totalScore += optionScore + getRoundOutcome(opponentPlay, myPlay)
}

console.log(totalScore)
