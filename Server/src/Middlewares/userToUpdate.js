export default function (req, res, next) {
  const filterData = {}
  Object.keys(req.body).forEach(key => {
    if (req.body[key] === '') return
    filterData[key] = req.body[key]
  })
  req.body = filterData
  next()
}
