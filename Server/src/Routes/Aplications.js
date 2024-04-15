import { Router } from 'express'
import UserExtractor from '../Middlewares/UserExtractor'
import { AplicationsController } from '../Controller/Aplications'
export const ApplicationsRouter = Router()
ApplicationsRouter.get('/:username', UserExtractor, AplicationsController.getAllAplications)
