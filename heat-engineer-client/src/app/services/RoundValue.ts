
const RoundNumber = (numberToRound: number): number => {
    // Rounds to 2 decimal place
    return Math.round(numberToRound * 100) / 100
}

export default RoundNumber;