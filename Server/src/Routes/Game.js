import { Router } from 'express'
import { GameController } from '../Controller/Game.js'
import UserExtractor from '../Middlewares/UserExtractor.js'
export const GameRouter = Router()
GameRouter.get('/:id', UserExtractor, GameController.getGame)
