const QueriesGame = {
  createGame: () => `
    INSERT INTO PUBLIC.games (id, board, state_of_game, turn) 
    VALUES ($1, $2, $3, $4)
    `,
  deleteGame: () => `
    DELETE FROM PUBLIC.games WHERE id = $1
    `,
  getGameById: () => `SELECT game.id, game.board,stateGame.state_of_game, turn.character as turn FROM PUBLIC.games as game
    INNER JOIN PUBLIC.state_of_games as stateGame ON
    stateGame.id = game.state_of_game
    INNER JOIN PUBLIC.characters as turn ON
    turn.id = game.turn
    WHERE game.id = $1`,
  updateStateOfGame: () => `
    UPDATE PUBLIC.games SET state_of_game = 2 where id = $1
    `,
  updateGame: () => `
    UPDATE PUBLIC.games SET board = $1, turn = $2 where id = $3
    `,
  getGameUserFrom: () => `
    SELECT PUBLIC.rivals.id as idRivals ,USERTO.id, PUBLIC.games.id as gameId,USERTO.name, USERTO.lastname, USERTO.username, CH2.character,REQ2.request,
    CH3.character as turn,STATEGAME.state_of_game, USERFROM.result_id as result FROM PUBLIC.rivals
    INNER JOIN PUBLIC.players AS USERFROM ON
    PUBLIC.rivals.user_from = USERFROM.id
    INNER JOIN PUBLIC.players AS USERTO ON
    PUBLIC.rivals.user_to = USERTO.id
    INNER JOIN PUBLIC.games ON
    PUBLIC.rivals.game_id = PUBLIC.games.id
    INNER JOIN PUBLIC.characters AS CH1 ON
    USERFROM.character_id = CH1.id
    INNER JOIN PUBLIC.characters AS CH2 ON
    USERTO.character_id = CH2.id
    INNER JOIN PUBLIC.characters AS CH3 ON
    PUBLIC.games.turn = CH3.id
    INNER JOIN PUBLIC.state_of_games AS STATEGAME ON
    PUBLIC.games.state_of_game = STATEGAME.id
    INNER JOIN PUBLIC.requests AS REQ1 ON
    USERFROM.request_id = REQ1.id
    INNER JOIN PUBLIC.requests AS REQ2 ON
    USERTO.request_id = REQ2.id
    WHERE (lower(USERFROM.username) = $1)
    `,
  getGameUserFromAndId: () => `
    SELECT PUBLIC.rivals.id as idRivals ,USERTO.id, PUBLIC.games.id as gameId,USERTO.name, USERTO.lastname, USERTO.username, CH2.character,REQ2.request,
    CH3.character as turn,STATEGAME.state_of_game FROM PUBLIC.rivals
    INNER JOIN PUBLIC.players AS USERFROM ON
    PUBLIC.rivals.user_from = USERFROM.id
    INNER JOIN PUBLIC.players AS USERTO ON
    PUBLIC.rivals.user_to = USERTO.id
    INNER JOIN PUBLIC.games ON
    PUBLIC.rivals.game_id = PUBLIC.games.id
    INNER JOIN PUBLIC.characters AS CH1 ON
    USERFROM.character_id = CH1.id
    INNER JOIN PUBLIC.characters AS CH2 ON
    USERTO.character_id = CH2.id
    INNER JOIN PUBLIC.characters AS CH3 ON
    PUBLIC.games.turn = CH3.id
    INNER JOIN PUBLIC.state_of_games AS STATEGAME ON
    PUBLIC.games.state_of_game = STATEGAME.id
    INNER JOIN PUBLIC.requests AS REQ1 ON
    USERFROM.request_id = REQ1.id
    INNER JOIN PUBLIC.requests AS REQ2 ON
    USERTO.request_id = REQ2.id
    WHERE (lower(USERFROM.username) = $1) and PUBLIC.games.id = $2
    `,
  getGameUserFromByID: () => `
    SELECT PUBLIC.rivals.id as idRivals ,USERTO.id, PUBLIC.games.id as gameId,USERTO.name, USERTO.lastname, USERTO.username, CH2.character,REQ2.request,
    CH3.character as turn,STATEGAME.state_of_game FROM PUBLIC.rivals
    INNER JOIN PUBLIC.players AS USERFROM ON
    PUBLIC.rivals.user_from = USERFROM.id
    INNER JOIN PUBLIC.players AS USERTO ON
    PUBLIC.rivals.user_to = USERTO.id
    INNER JOIN PUBLIC.games ON
    PUBLIC.rivals.game_id = PUBLIC.games.id
    INNER JOIN PUBLIC.characters AS CH1 ON
    USERFROM.character_id = CH1.id
    INNER JOIN PUBLIC.characters AS CH2 ON
    USERTO.character_id = CH2.id
    INNER JOIN PUBLIC.characters AS CH3 ON
    PUBLIC.games.turn = CH3.id
    INNER JOIN PUBLIC.state_of_games AS STATEGAME ON
    PUBLIC.games.state_of_game = STATEGAME.id
    INNER JOIN PUBLIC.requests AS REQ1 ON
    USERFROM.request_id = REQ1.id
    INNER JOIN PUBLIC.requests AS REQ2 ON
    USERTO.request_id = REQ2.id
    WHERE USERFROM.id = $1 and PUBLIC.games.id = $2
    `,
  getGameUserTo: () => `
    SELECT PUBLIC.rivals.id as idRivals ,USERFROM.id, PUBLIC.games.id as gameId,USERFROM.name, USERFROM.lastname, USERFROM.username, CH1.character,REQ1.request,
    CH3.character as turn,STATEGAME.state_of_game, USERTO.result_id as result FROM PUBLIC.rivals
    INNER JOIN PUBLIC.players AS USERFROM ON
    PUBLIC.rivals.user_from = USERFROM.id
    INNER JOIN PUBLIC.players AS USERTO ON
    PUBLIC.rivals.user_to = USERTO.id
    INNER JOIN PUBLIC.games ON
    PUBLIC.rivals.game_id = PUBLIC.games.id
    INNER JOIN PUBLIC.characters AS CH1 ON
    USERFROM.character_id = CH1.id
    INNER JOIN PUBLIC.characters AS CH2 ON
    USERTO.character_id = CH2.id
    INNER JOIN PUBLIC.characters AS CH3 ON
    PUBLIC.games.turn = CH3.id
    INNER JOIN PUBLIC.state_of_games AS STATEGAME ON
    PUBLIC.games.state_of_game = STATEGAME.id
    INNER JOIN PUBLIC.requests AS REQ1 ON
    USERFROM.request_id = REQ1.id
    INNER JOIN PUBLIC.requests AS REQ2 ON
    USERTO.request_id = REQ2.id
    WHERE (lower(USERTO.username) = $1)
    `,
  getGameUserToAndId: () => `
    SELECT PUBLIC.rivals.id as idRivals ,USERFROM.id,PUBLIC.games.id as gameId ,USERFROM.name, USERFROM.lastname, USERFROM.username, CH1.character,REQ1.request,
    CH3.character as turn,STATEGAME.state_of_game FROM PUBLIC.rivals
    INNER JOIN PUBLIC.players AS USERFROM ON
    PUBLIC.rivals.user_from = USERFROM.id
    INNER JOIN PUBLIC.players AS USERTO ON
    PUBLIC.rivals.user_to = USERTO.id
    INNER JOIN PUBLIC.games ON
    PUBLIC.rivals.game_id = PUBLIC.games.id
    INNER JOIN PUBLIC.characters AS CH1 ON
    USERFROM.character_id = CH1.id
    INNER JOIN PUBLIC.characters AS CH2 ON
    USERTO.character_id = CH2.id
    INNER JOIN PUBLIC.characters AS CH3 ON
    PUBLIC.games.turn = CH3.id
    INNER JOIN PUBLIC.state_of_games AS STATEGAME ON
    PUBLIC.games.state_of_game = STATEGAME.id
    INNER JOIN PUBLIC.requests AS REQ1 ON
    USERFROM.request_id = REQ1.id
    INNER JOIN PUBLIC.requests AS REQ2 ON
    USERTO.request_id = REQ2.id
    WHERE (lower(USERTO.username) = $1) and PUBLIC.games.id = $2
    `,
  getGameUserToByID: () => `
    SELECT PUBLIC.rivals.id as idRivals ,USERFROM.id, PUBLIC.games.id as gameId, USERFROM.name, USERFROM.lastname, USERFROM.username, CH1.character,REQ1.request,
    CH3.character as turn,STATEGAME.state_of_game FROM PUBLIC.rivals
    INNER JOIN PUBLIC.players AS USERFROM ON
    PUBLIC.rivals.user_from = USERFROM.id
    INNER JOIN PUBLIC.players AS USERTO ON
    PUBLIC.rivals.user_to = USERTO.id
    INNER JOIN PUBLIC.games ON
    PUBLIC.rivals.game_id = PUBLIC.games.id
    INNER JOIN PUBLIC.characters AS CH1 ON
    USERFROM.character_id = CH1.id
    INNER JOIN PUBLIC.characters AS CH2 ON
    USERTO.character_id = CH2.id
    INNER JOIN PUBLIC.characters AS CH3 ON
    PUBLIC.games.turn = CH3.id
    INNER JOIN PUBLIC.state_of_games AS STATEGAME ON
    PUBLIC.games.state_of_game = STATEGAME.id
    INNER JOIN PUBLIC.requests AS REQ1 ON
    USERFROM.request_id = REQ1.id
    INNER JOIN PUBLIC.requests AS REQ2 ON
    USERTO.request_id = REQ2.id
    WHERE USERTO.id = $1 and PUBLIC.games.id = $2
    `,
  endGame: () => 'UPDATE PUBLIC.games SET state_of_game = 3 WHERE id = $1'
}

export default QueriesGame
