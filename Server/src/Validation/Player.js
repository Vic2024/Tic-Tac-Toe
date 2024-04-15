import zod from 'zod'

const playerSchema = zod.object({
  name: zod.string(),
  lastname: zod.string(),
  username: zod.string(),
  character: zod.number().int(),
  request: zod.number().int(),
  socketId: zod.string().default('')
})

export const validatePlayer = (input) => playerSchema.safeParse(input)
