import messages from './Messages/Response.js'
const RESPONSE_OPTION = {
  ok: (res, data, name) => res.status(200).json({ data, message: { ...messages[name] } }),
  recovered: (res, data, name) => res.status(200).json({ data, message: { ...messages[name] } }),
  created: (res, data, name) => res.status(201).json({ data, message: { ...messages[name] } }),
  updated: (res, data, name) => res.status(200).json({ data, message: { ...messages[name] } }),
  deleted: (res, data, name) => res.status(200).json({ data, message: { ...messages[name] } })
}

export default function (req, res) {
  const { name, res: data } = req.body
  RESPONSE_OPTION[name](res, data, name)
}
