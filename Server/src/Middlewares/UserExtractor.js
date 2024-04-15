import jwt from 'jsonwebtoken'

const errorMessage = {
  es: 'Sus credenciales han expirado',
  en: 'Your credentials have expired'
}
const tokenError = {
  es: 'token faltante o no válido',
  en: 'token missing or invalid'
}

export default function (request, response, next) {
  const authorization = request.get('authorization')

  let token = null
  let decodedToken
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  } catch (err) {
    return response.status(401).json({ error: { message: errorMessage } })
  }

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: { message: tokenError } })
  }

  const { id: userId } = decodedToken
  request.userId = userId

  next()
}
