const QueriesUser = {
  allData: () => 'SELECT id, name, lastname, username FROM PUBLIC.users WHERE NOT PUBLIC.users.username = $1  ',
  getDataByUsername: () => 'SELECT * FROM PUBLIC.users WHERE (lower(PUBLIC.users.username) = $1 )',
  getByID: () => 'SELECT name, lastname, email FROM PUBLIC.users WHERE id = $1',
  insertUser: () => `
    INSERT INTO PUBLIC.users (id, name, lastname, username, password, email)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
  deleteUser: () => 'DELETE FROM "USER" WHERE id = $1',
  updateUser: (query, returning) => `UPDATE PUBLIC.users SET ${query} where id = $${query.split(',').length + 1}  RETURNING ${returning}`,
  isRealUser: () => 'SELECT password FROM PUBLIC.users WHERE id = $1'
}
export default QueriesUser
