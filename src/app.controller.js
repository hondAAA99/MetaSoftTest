import express from 'express'
import { PORT, HOST } from './config/config.services.js'
import helmet from 'helmet'
import cors from 'cors'
import {
  globalErrorHandling,
  ErrorNotFound,
} from './common/utils/globalresponse.js'
import limiter from './common/middleware/limiter.js'
import { checkDataBaseConnection } from './DataBase/DB.connection.js'
import { authRouter } from './modules/auth/auth.controller.js'
import postRouter from './modules/post/post.controller.js'
import logger from './common/middleware/logger.js'
const app = express()
const port = Number(PORT) ?? 8080
const bootstrap = async () => {
  app.use(express.json())
  app.use(helmet(), cors(), limiter, logger)
  await checkDataBaseConnection()
  app.get('/', (req, res) => {
    res.status(200).send('hello to my server')
  })
  app.use('/auth', authRouter)
  app.use('/posts', postRouter)
  app.all('{/*demo}', (req, res, next) => {
    ErrorNotFound(
      `the request on ${req.url} with method ${req.method} has wrong path`,
    )
  })
  app.use(globalErrorHandling)
  const appServer = app.listen(port, () => {
    console.log(`app is running on port ${port}`)
  })
}
export default bootstrap
