const QueriesPlayers = {
  getPlayersHost: () => `SELECT host.name, host.lastname, host.username as host, CH.character, invited.username as invited FROM PUBLIC.rivals as rivals
    INNER JOIN PUBLIC.players as host ON
    host.id = rivals.user_from
    INNER JOIN PUBLIC.players as invited ON 
    invited.id = rivals.user_to
    INNER JOIN PUBLIC.characters AS CH ON
    ch.id = host.character_id
    WHERE rivals.game_id = $1 and (lower(host.username) = $2)
    `,

  getPlayersInvited: () => `SELECT invited.name, invited.lastname, invited.username as host, CH.character, host.username as invited FROM PUBLIC.rivals as rivals
    INNER JOIN PUBLIC.players as host ON
    host.id = rivals.user_from
    INNER JOIN PUBLIC.players as invited ON 
    invited.id = rivals.user_to
    INNER JOIN PUBLIC.characters AS CH ON
    ch.id = invited.character_id
    WHERE rivals.game_id = $1 and (lower(invited.username) = $2)
    `,

  createPlayers: () => `
    INSERT INTO PUBLIC.players (name, lastname, username, character_id, request_id) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
  deletePlayers: () => `
    DELETE FROM PUBLIC.players WHERE id = $1
    `,
  updatePlayer: () => `
    UPDATE PUBLIC.players SET request_id = 2 where id = $1
    `,
  updatePlayerResult: () => `UPDATE PUBLIC.players as player SET result_id = $1 WHERE player.id = $2 
    RETURNING username, result_id as result`
}

export default QueriesPlayers
