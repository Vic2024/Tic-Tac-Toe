export const isValidData = (message) => {
  const JSONerrors = JSON.parse(message)
  const errors = {}
  JSONerrors.forEach((el) => {
    errors[`${el.path[0]}`] = el.message
  })
  return errors
}
