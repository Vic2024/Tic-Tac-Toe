import { Router } from 'express'
import { RefreshTokneController } from '../Controller/RefreshToken.js'
export const refreshTokenRouter = Router()
refreshTokenRouter.post('/', RefreshTokneController.refresToken)
