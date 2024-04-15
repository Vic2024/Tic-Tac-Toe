import { WINNER_COMBOS } from "../constants.js"
export const checkWinnerForm = (boardToCheck) => {

    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            console.log('aquiiiii')
            return boardToCheck[a]
        }
    }

    return null
}
export const checkEndGame = (newBoard) => newBoard.every((square) => square !== null)