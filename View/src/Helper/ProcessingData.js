export default function processingData({ usersOnline, usersOffline }) {
    /* console.log(usersOnline, usersOffline) */
    let allUsers = [...usersOffline]
    if (usersOnline.length === 0) {
        return [...usersOffline]
    } else {
        const Online = usersOnline.map(user => user.id)
        /* console.log(Online) */
        Online.forEach(users => {
            const findIndex = allUsers.findIndex(data => data.id === users)
            allUsers.splice(findIndex, 1)

        })
    }

    return allUsers
}