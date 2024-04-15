import { Router } from 'express'
import { UserController } from '../Controller/User.js'
import UserExtractor from '../Middlewares/UserExtractor.js'
import userToUpdate from '../Middlewares/userToUpdate.js'
import ConfirmPassword from '../Middlewares/ConfirmPassword.js'
export const userRouter = Router()
userRouter.get('/', UserExtractor, UserController.getAll)
userRouter.get('/:id', UserExtractor, UserController.getById)
userRouter.post('/', UserController.create)
userRouter.patch('/:id', UserExtractor, ConfirmPassword, userToUpdate, UserController.patch)
userRouter.delete('/:id', UserExtractor, ConfirmPassword, UserController.delete)
