import rawData from './data'

type Option = 'rock' | 'paper' | 'scissors'

const data = rawData.split('\n').map((round) => round.split(' '))

function getMyPlay(strategy: string, oppPlay: string): Option {
	if (strategy === 'X') {
		if (oppPlay === 'A') return 'scissors'
		if (oppPlay === 'B') return 'rock'
		if (oppPlay === 'C') return 'paper'
	}
	if (strategy === 'Y') {
		if (oppPlay === 'A') return 'rock'
		if (oppPlay === 'B') return 'paper'
		if (oppPlay === 'C') return 'scissors'
	}
	if (strategy === 'Z') {
		if (oppPlay === 'A') return 'paper'
		if (oppPlay === 'B') return 'scissors'
		if (oppPlay === 'C') return 'rock'
	}
	throw new Error()
}

let totalScore = 0

for (const round of data) {
	const [opponentPlay, myStrategy] = round

	const myPlay = getMyPlay(myStrategy, opponentPlay)
	const optionScore = myPlay === 'rock' ? 1 : myPlay === 'paper' ? 2 : 3
	const outcomeScore = myStrategy === 'X' ? 0 : myStrategy === 'Y' ? 3 : 6
	totalScore += optionScore + outcomeScore
}

console.log(totalScore)
