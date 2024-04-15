import { Router } from 'express'
import { LoginController } from '../Controller/Login.js'
export const LoginRouter = Router()
LoginRouter.post('/', LoginController.Login)
