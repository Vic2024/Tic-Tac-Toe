const QueriesCharacter = {
  getCharacterId: () => `SELECT CH.id FROM PUBLIC.characters as CH
    WHERE CH.character = $1`
}

export default QueriesCharacter
