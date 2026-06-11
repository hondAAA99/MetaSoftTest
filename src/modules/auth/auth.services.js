import {
  ErrorConflict,
  ErrorInternalServerError,
  ErrorUnAuthorizedRequest,
  SuccessResponse,
} from '../../common/utils/globalresponse.js'
import userRepo from '../../DataBase/repo/user.repo.js'
import { GlobalCompare, Globalhash } from '../../common/security/hash.js'
import {
  SECRET_ADMIN_REFRESH_TOKEN,
  SECRET_USER_REFRESH_TOKEN,
  TOKEN_ADMIN_PREFIX,
} from '../../config/config.services.js'
import {
  generateAccessToken,
  TokenDecode,
  TokenVerify,
} from '../../common/security/jsonWebTokens.js'
import servicesHelpers from './auth.services.helpers.js'
import userModel from '../../DataBase/models/user.model.js'
class auth {
  constructor() {}
  signUp = async (req, res, next) => {
    const { userName, email, passwordSchema } = req.body
    const user = await servicesHelpers.checkUserExistsAndConfirmed(email)
    await userModel
      .create({
        userName,
        email,
        password: Globalhash({ plainText: passwordSchema.password }),
      })
      .catch(err => {
        ErrorInternalServerError(
          `error in creating user or failed to send email *${err}`,
        )
      })
    SuccessResponse({ res, data: 'please confirm your email' })
  }
  logIn = async (req, res, next) => {
    const { email, password } = req.body
    const user = await servicesHelpers.checkUserExistsAndConfirmed(email)
    if (
      !GlobalCompare({
        plainText: password,
        hashText: user.password,
      })
    ) {
      return ErrorUnAuthorizedRequest('wrong password')
    }
    console.log(user)
    SuccessResponse({
      res,
      data: servicesHelpers.generateTokens(user),
    })
  }

  generateAccessToken = async (req, res, next) => {
    const { authorization } = req.headers
    const [prefix, token] = authorization.split(' ');
    let secret =
      prefix == TOKEN_ADMIN_PREFIX
        ? SECRET_ADMIN_REFRESH_TOKEN
        : SECRET_USER_REFRESH_TOKEN
    
    const verifyToken = TokenDecode({
      token: token,
      secret,
    })
    SuccessResponse({
      res,
      data: {
        accessToken: generateAccessToken({
          userId: verifyToken.userId,
          role: verifyToken.role,
        }),
      },
    })
  }
}
export default new auth()
