import confetti from "canvas-confetti"
import { useAuth } from "../Context/AuthContext"
import useSWR from "swr"
import { useEffect, useState } from "react"
import { TURNS } from "../constants"
import { checkWinnerForm } from "../logic/board"
import { useNavigate } from 'react-router-dom'
import { saveGame, getSavedGame, getSavedGameOff, getWinnerOff, getWinner, getEndGameOff, getEndGame } from "./socket"
const initialState = {
    id: '',
    board: Array(9).fill(''),
    turn: '',
    state_of_game: '',
}
export default function useGameOnline() {
    const { auth } = useAuth()
    const fetcher = url => fetch(url, { method: 'GET', headers: { 'content-type': 'application/json', authorization: `Bearer ${auth.token}` } }).then(res => res.json())
    const { data: player, isLoading } = useSWR(`/api/players/${auth.username}/${window.location.pathname.split('/')[3]}`, fetcher)
    const [game, setGame] = useState(initialState)
    const [winner, setWinner] = useState(null)
    const navigate = useNavigate()
    const updateBoard = (index) => {
        if (game.board[index]) return
        const newBoard = [...game.board]
        newBoard[index] = player.data.character
        const newTurn = player.data.character === TURNS.X ? TURNS.O : TURNS.X
        const newGame = { ...game, board: newBoard, turn: newTurn }
        setGame(newGame)
        saveGame({ game: newGame, rival: player.data.invited })

    }
    useEffect(() => {
        async function getGame() {
            try {
                const result = await fetch(`/api/game/${window.location.pathname.split('/')[3]}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${auth.token}`
                    }
                })
                if (result.status === 200) {
                    const data = await result.json()
                    if (data.data.state_of_game === 'Finished') navigate(`/online/dashboard/${auth.id}/game_log`)
                    setGame({ ...data.data })
                    const isWinner = checkWinnerForm(data.data.board)
                    if (isWinner) {
                        setWinner(isWinner)
                    }
                }
            } catch (err) {
                setGame(initialState)
            }
        }
        getGame()
    }, [auth, navigate])

    useEffect(() => {
        getSavedGame((err, result) => {
            if (err) return
            setGame({ ...result })
        })

        getWinner((err, result) => {
            if (err) return
            if (result === player.data.character) confetti()
            setWinner(result)
        })
        getEndGame((err, result) => {
            if (err) return
            if (result.endGame !== false) {
                if (result.idGame === window.location.pathname.split('/')[3]) {
                    navigate(`/online/dashboard/${auth.id}/game_log`)
                }
            }
        })
        return () => {
            getSavedGameOff()
            getWinnerOff()
            getEndGameOff()
        }
    }, [game, winner, navigate, auth, player])


    return { player, isLoading, game, updateBoard, winner, auth }
}