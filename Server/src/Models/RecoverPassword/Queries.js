const queriesRecoverPass = {
  getUser: () => 'SELECT * FROM PUBLIC.users WHERE email = $1'
}

export default queriesRecoverPass
