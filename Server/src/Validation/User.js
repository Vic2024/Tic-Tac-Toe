import zod from 'zod'
import messages from './messages.js'

const userSchema = zod.object({
  name: zod.string({
    invalid_type_error: messages.invalid_type_error,
    required_error: messages.required
  }).min(2, { message: messages.min }),
  lastname: zod.string({
    invalid_type_error: messages.invalid_type_error,
    required_error: messages.required
  }).min(2, { message: messages.min }),
  username: zod.string({
    invalid_type_error: messages.invalid_type_error,
    required_error: messages.required
  }).min(5, { message: messages.min }),
  password: zod.string({
    invalid_type_error: messages.invalid_type_error,
    required_error: messages.required
  }).min(5, { message: messages.min }),
  email: zod.string({
    invalid_type_error: messages.invalid_type_error,
    required_error: messages.required
  }).email({ message: messages.email })
})
export const validateUser = (input) => userSchema.safeParse(input)
export const validatePartialUser = (input) => userSchema.partial().safeParse(input)
export const validateConfirmPasswor = (input) => {
  const confirmPassword = zod.object({
    confirmPassword: zod.string({
      invalid_type_error: messages.invalid_type_error,
      required_error: messages.required
    }).min(5, { message: messages.min })
  })
  return confirmPassword.safeParse(input)
}
