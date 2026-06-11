import auth from './auth.services.js'
import { Router } from 'express'
import {
  signUpSchema,
  signInSchema,
} from './auth.validation.schema.js'
import { validationMiddleWare } from '../../common/middleware/validation.js'
export const authRouter = Router()
authRouter.post('/register', validationMiddleWare(signUpSchema), auth.signUp)
authRouter.post('/log-in', validationMiddleWare(signInSchema), auth.logIn)
authRouter.get('/refresh-token', auth.generateAccessToken)
