export default function userActive (socket, users) {
  const newUsers = [...users]
  let oldSocketId
  const { id, name, lastname, username, isLogged } = socket.handshake.auth
  const user = { id, name, lastname, username, isLogged, socketId: socket.id }
  const isUserLogged = newUsers.some((user) => user.id === id)
  if (isUserLogged !== true) {
    newUsers.push(user)
  } else {
    const indexUserLogged = newUsers.findIndex(user => user.id === id)
    oldSocketId = newUsers[indexUserLogged].socketId
    newUsers[indexUserLogged] = user
  }

  return { isSucces: true, result: { newUsers, oldSocketId } }
}
