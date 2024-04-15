const QueriesResetPass = {
  resetPass: () => 'UPDATE PUBLIC.users SET password = $1 where id = $2'
}

export default QueriesResetPass
