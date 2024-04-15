import io from 'socket.io-client'
let socket

export const initiateSocket = (user, cb) => {
    socket = io('/', {
        auth: {
            serverOffset: 0,
            isLogged: true,
            ...user,
        }
    })
    console.log('conectando socket')
    if (!socket) return true
    socket.on('init', users => {
        console.log('Recibiendo usuarios online y offline')
        return cb(null, users)
    })
}

export const disconnectSocket = () => {
    console.log('Desconectando Socket')
    if (socket) socket.disconnect()
}

export const notification = (cb) => {
    if (!socket) return (true)
    socket.on('notification', users => {
        console.log('Evento Websocket notificado')
        return cb(null, users)
    })
}

export const getGames = (cb) => {
    if (!socket) return (true)
    socket.on('games', users => {
        console.log('Evento Websocket obteniendo partidas')
        return cb(null, users)
    })
}

export const getSavedGame = cb => {
    if (!socket) return (true)
    socket.on('getSavedGame', savedGame => {
        console.log('Evento Obteiendo Juego Guardado')
        return cb(null, savedGame)
    })
}

export const getSavedGameOff = () => {
    if (socket) socket.removeAllListeners('getSavedGame')
}

export const getWinner = cb => {
    if (!socket) return (true)
    socket.on('getWinner', getWinner => {
        console.log('Evento Socket Obteniendo Ganador')
        return cb(null, getWinner)
    })
}
export const isLogin = cb => {
    if (!socket) return (true)
    socket.on('Logout', isLogin => {
        console.log('Evento Socket Cerrando Sesion')
        return cb(null, isLogin)
    })
}

export const getWinnerOff = () => {
    if (socket) socket.removeAllListeners('getWinner')
}

export const sendNotification = ({ characters, to }) => {
    if (socket) {
        Object.keys(characters).forEach(character => {
            if (characters[character].isChecked === true) {
                const newData = {
                    ...socket.auth,
                    character: parseInt(characters[character].value),
                    request: 2,
                    role: 1
                }
                socket.auth = { ...newData }
            } else {
                const newData = {
                    ...to,
                    character: parseInt(characters[character].value),
                    request: 1,
                    role: 2
                }
                to = { ...newData }
            }
        })
        socket.emit('create_game', { from: { ...socket.auth }, to })
    }
}

export const sendResponse = ({ card, action }) => {
    if (socket) {
        socket.emit('responseRequest', { data: { ...card }, action })
    }
}

export const InitGame = ({ username, id }) => {
    if (socket) {
        socket.emit('getPlayers', { username, id })
    }
}

export const saveGame = ({ game, rival }) => {
    if (socket) {
        socket.emit('saveGame', { game, rival })
    }
}

export const resetGame = ({ idGame, rival }) => {
    if (socket) {
        socket.emit('resetGame', { idGame, rival })
    }
}

export const endGame = ({ idGame, rival }) => {
    if (socket) {
        socket.emit('endGame', { idGame, rival })
    }
}

export const getEndGame = cb => {
    if (!socket) return (true)
    socket.on('endGame', data => {
        console.log('Evento Socket Juego Finalizado')
        return cb(null, data)
    })
}

export const getEndGameOff = () => {
    if (socket) socket.removeAllListeners('endGame')
}

export const getMessages = cb => {
    if (!socket) return (true)
    socket.on('messages', message => {
        console.log('Evento Socket Recibiendo Mensaje')
        return cb(null, message)
    })
}

export const getMessagesOff = () => {
    if (socket) socket.removeAllListeners('messages')
}