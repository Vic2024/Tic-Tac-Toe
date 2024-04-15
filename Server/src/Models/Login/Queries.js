const queriesLogin = {
  getUser: () => 'select id, username, password, name, lastname from public.users where (lower(public.users.username) = $1)'
}

export default queriesLogin
