import messages from './Messages/Error.js'
const MANEJO_ERROR = {
  CastError: res => res.status(400).send({ error: messages.CastError }),
  ValidationError: (res, { message }) => res.status(409).send({ error: message }),
  TokenExpireError: res => res.status(401).json({ error: messages.TokenExpireError }),
  defaultError: res => res.status(500).end(),
  InvalidData: (res, { message, nameMessages }) => res.status(400).json({ error: messages[nameMessages] || message }),
  NotFound: (res) => res.status(404).json({ error: messages.notFound }),
  InvalidUser: (res) => res.status(401).json({ error: messages.InvalidUser })

}

export default (error, request, res) => {
  /* console.log(error) */
  MANEJO_ERROR[error?.name || 'defaultError'](res, error)
}
