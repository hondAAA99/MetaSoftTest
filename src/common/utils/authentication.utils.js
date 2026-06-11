import { Types } from 'mongoose'
import {
  SECRET_ADMIN_ACCESS_TOKEN,
  SECRET_USER_ACCESS_TOKEN,
  TOKEN_ADMIN_PREFIX,
  TOKEN_USER_PREFIX,
} from '../../config/config.services.js'
import userModel from '../../DataBase/models/user.model.js'
import { TokenDecode, TokenVerify } from '../security/jsonWebTokens.js'
import {
  ErrorConflict,
  Errorforbidden,
  ErrorUnAuthorizedRequest,
} from './globalresponse.js'
async function authenticateUtilts(authorization) {
  let [prefix, token] = authorization.split(' ')
  if (!prefix) {
    Errorforbidden('invalid token*1')
  }
  const secret = (function () {
    if (prefix == TOKEN_USER_PREFIX) {
      return SECRET_USER_ACCESS_TOKEN
    } else if (prefix == TOKEN_ADMIN_PREFIX) {
      return SECRET_ADMIN_ACCESS_TOKEN
    }
    return Errorforbidden('invalid token*2')
  })()
  const verify = TokenDecode({
    token: token,
    secret,
  })
  // console.log(verify.userId)
  const user = await userModel.findOne({
    id: verify.userId,
  })
  if (!user) ErrorConflict('user does not exists')
  return { user, token, decoded: verify }
}
export default authenticateUtilts
