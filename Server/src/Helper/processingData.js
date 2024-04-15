export function processingData (online, offline) {
  let allUsers = []
  if (online.length === 0) {
    return [...offline]
  } else {
    const usersOnline = online.map(user => {
      return {
        id: user.id,
        socketId: user.socketId
      }
    })
    usersOnline.forEach(users => {
      const findUser = offline.find(user => user.id === users.id)
      const findIndex = offline.findIndex(user => user.id === users.id)
      offline[findIndex] = {
        ...findUser,
        isLogged: true,
        socketId: users.socketId
      }
      allUsers = [...offline]
    })
  }

  return allUsers
}

export function disconnectData (id, dbUsers) {
  const findUser = dbUsers.find(user => user.id === id)
  const findIndex = dbUsers.findIndex(user => user.id === id)
  dbUsers[findIndex] = {
    ...findUser,
    isLogged: false,
    socketId: undefined
  }
  return [...dbUsers]
}
