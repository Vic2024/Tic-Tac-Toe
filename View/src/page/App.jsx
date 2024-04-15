import confetti from "canvas-confetti"
import { useState, useEffect } from "react"
import Square from "../Components/Game/Square.jsx"
import Button from "../Components/Button.jsx"
import { TURNS } from "../constants.js"
import { checkWinnerForm, checkEndGame } from "../logic/board.js"
import { saveGame, resetGameStorage } from "../logic/storage/index.js"
import WinnerModal from "../Components/Game/WinnerModal.jsx"
import { useTranslation } from "react-i18next"
function App() {
  const { t } = useTranslation(["data"])
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    saveGame({ board: newBoard, turn: newTurn })
    const newWinner = checkWinnerForm(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  useEffect(() => {
    const boardFromStorage = JSON.parse(window.localStorage.getItem('board'))
    if (boardFromStorage) {
      const isWinner = checkWinnerForm(boardFromStorage)
      const isFinished = checkEndGame(boardFromStorage)
      if (isWinner) {
        confetti()
        setWinner(isWinner)
      } else if (isFinished) setWinner(false)
    }

  }, [])
  return (
    <section className='w-fit p-2 text-center flex flex-col gap-4 justify-center items-center '>
      <Button
        onClick={resetGame}
      >
        {t('app.resetGame')}</Button>
      <section className='grid gap-[10px] grid-cols-3 justify-center justify-items-center'>
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </section>
      <section className='flex justify-center mt-[15px] w-fit relative rounded-[10px]'>
        <Square turnPosition isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square turnPosition isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </section>
  )
}

export default App
