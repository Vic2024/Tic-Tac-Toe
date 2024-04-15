const QueriesNotifi = {
  createNotifi: () => `
    INSERT INTO PUBLIC.notifications (user_from, user_to, read, date, content)
    VALUES ($1, $2, $3, $4, $5)
    `,
  getNotifiSave: () => `
    SELECT NOTIFI.id, NOTIFI.user_from, NOTIFI.user_to,NOTIFI.read, NOTIFI.date, character, request, NOTIFI.content FROM PUBLIC.notifications AS NOTIFI
    INNER JOIN PUBLIC.rivals AS RIVALS ON
    NOTIFI.content = RIVALS.id
    INNER JOIN PUBLIC.players AS GUEST ON
    GUEST.id = RIVALS.user_to
    INNER JOIN PUBLIC.characters ON
    GUEST.character_id = PUBLIC.characters.id
    INNER JOIN PUBLIC.requests ON
    GUEST.request_id = PUBLIC.requests.id
    WHERE (lower(NOTIFI.user_to) = $1) and NOTIFI.content = $2
    `,
  getAllNotifi: () => `
    SELECT NOTIFI.id, NOTIFI.user_from, NOTIFI.user_to,NOTIFI.read, NOTIFI.date, character, request, NOTIFI.content FROM PUBLIC.notifications AS NOTIFI
    INNER JOIN PUBLIC.rivals AS RIVALS ON
    NOTIFI.content = RIVALS.id
    INNER JOIN PUBLIC.players AS GUEST ON
    GUEST.id = RIVALS.user_to
    INNER JOIN PUBLIC.characters ON
    GUEST.character_id = PUBLIC.characters.id
    INNER JOIN PUBLIC.requests ON
    GUEST.request_id = PUBLIC.requests.id
    WHERE (lower(NOTIFI.user_to) = $1) and read = false
    `,
  deleteNotifi: () => `
    DELETE FROM PUBLIC.notifications WHERE id = $1
    `,
  updateNotifi: () => `
     UPDATE PUBLIC.notifications SET read = true where id = $1
    `
}

export default QueriesNotifi
