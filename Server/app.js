/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
import express, { json } from 'express'
import './src/ConnectionDB.js'
import cors from 'cors'
import dotenv from 'dotenv'
import { app, server } from './src/Socket_io/Socket_Io.js'
import { userRouter } from './src/Routes/User.js'
import { LoginRouter } from './src/Routes/Login.js'
import { RecoverEmail } from './src/Routes/RecoverEmail.js'
import { ResetPassRouter } from './src/Routes/resetPassword.js'
import { PlayersRouter } from './src/Routes/Players.js'
import { GameRouter } from './src/Routes/Game.js'
import { refreshTokenRouter } from './src/Routes/RefreshToken.js'
import path from 'path'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
dotenv.config()

const PORT = process.env.PORT ?? 5000
app.disable('x-powered-by')
app.use(cors({ origin: '*' }))
app.use(json())
app.use('/api/user', userRouter)
app.use('/api/players', PlayersRouter)
app.use('/api/game', GameRouter)
app.use('/api/login', LoginRouter)
app.use('/api/recover_email', RecoverEmail)
app.use('/api/reset_password', ResetPassRouter)
app.use('/api/refresh-token', refreshTokenRouter)

server.listen(PORT, () => {
  console.log(`App listening on Port: ${PORT}`)
})
