/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
import { initiateSocket, disconnectSocket, notification, getGames, isLogin, getMessages } from '../Hooks/socket';
import { useAuth } from "./AuthContext";
import handlerData from "../Helper/HandlerData";
import { useNavigate } from "react-router-dom";
import HandlerMessage from "../Helper/HandlerMessage";
const connectionContext = React.createContext()

export const usePlayers = () => {
    const { players, setPlayers } = React.useContext(connectionContext)
    return { players, setPlayers }
}
export const useNotification = () => {
    const { notifi, setNotifi } = React.useContext(connectionContext)
    return { notifi, setNotifi }
}
export const useGames = () => {
    const { games, setGames } = React.useContext(connectionContext)
    return { games, setGames }
}
export const useMessages = () => {
    const { message, setMessage } = React.useContext(connectionContext)
    return { message, setMessage }
}

const ConnectionProvider = ({ children }) => {
    const { auth, setAuth } = useAuth()
    const [players, setPlayers] = React.useState([])
    const [notifi, setNotifi] = React.useState([])
    const [games, setGames] = React.useState([])
    const [message, setMessage] = React.useState([])
    const navigate = useNavigate()

    React.useEffect(() => {
        if (auth) initiateSocket(auth, (err, users) => {
            if (err) return
            const filter = users.filter(user => user.id !== auth.id)
            setPlayers(filter)
        })

        getGames((err, { data, action }) => {
            if (err) return
            setGames((prevGames) => {
                const handlerGame = handlerData()[action]
                return handlerGame({ prevData: prevGames, data })
            })
        })

        isLogin((err, data) => {
            if (err) return
            if (data.isLogged !== false) {
                navigate('/')
                setAuth(null)
                window.localStorage.removeItem('LoggedUser')
            }
        })

        notification((err, { data, action }) => {
            if (err) return
            setNotifi((preNotify) => {
                const handlerNotifi = handlerData()[action]
                return handlerNotifi({ prevData: preNotify, data })
            })
        })

        getMessages((err, message) => {
            if (err) return
            setMessage((prevData) => {
                if (message.inGame && message.idGame) {
                    const location = window.location.pathname.split('/')[3]
                    if (location !== message.idGame) {
                        return HandlerMessage({ prevData: prevData === undefined ? [] : prevData, message: { ...message.message } })
                    }
                } else {
                    return HandlerMessage({ prevData: prevData === undefined ? [] : prevData, message })
                }
            })
        })
        return () => disconnectSocket()
    }, [auth, navigate, setAuth])

    const value = {
        players, setPlayers,
        notifi, setNotifi,
        games, setGames,
        message, setMessage
    }
    return <connectionContext.Provider value={{ ...value }}>
        {children}
    </connectionContext.Provider>

}

export default ConnectionProvider