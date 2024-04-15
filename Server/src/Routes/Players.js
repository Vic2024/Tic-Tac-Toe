import { Router } from 'express'
import { PlayersController } from '../Controller/Players.js'
import UserExtractor from '../Middlewares/UserExtractor.js'
export const PlayersRouter = Router()
PlayersRouter.get('/:username/:idGame', UserExtractor, PlayersController.getPlayer)
