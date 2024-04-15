import { Router } from 'express'
import { ResetPassController } from '../Controller/ResetPass.js'
export const ResetPassRouter = Router()
ResetPassRouter.patch('/:id', ResetPassController.ResetPass)
