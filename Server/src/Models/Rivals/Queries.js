const QueriesRivals = {
  createRivals: () => `INSERT INTO PUBLIC.rivals (user_from, user_to, game_id) 
    VALUES ($1, $2, $3) RETURNING id`,
  deleteRivals: () => 'DELETE FROM PUBLIC.rivals WHERE id = $1 RETURNING *',
  getRivals: () => 'SELECT user_from, user_to, game_id FROM PUBLIC.rivals WHERE id = $1',
  getRivalsByIdGame: () => 'SELECT user_from, user_to FROM PUBLIC.rivals WHERE game_id = $1',
  getRivalsToUpdate: () => `SELECT p1.id as id_Player1, p1.username as username_Player1, p2.id as id_player2, p2.username as username_player2 FROM PUBLIC.rivals as rivals 
    INNER JOIN PUBLIC.players as p1 on
    p1.id = rivals.user_from
    INNER JOIN PUBLIC.players as p2 on
    p2.id = rivals.user_to
    WHERE game_id = $1`

}

export default QueriesRivals
