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
  TokenVerify,
} from '../../common/security/jsonWebTokens.js'
import servicesHelpers from './auth.services.helpers.js'
class auth {
  _userModel = new userRepo()
  constructor() {}
  signUp = async (req, res, next) => {
    const { userName, email, passwordSchema, phone, gender, BirthDate } =
      req.body
    const user = await servicesHelpers.checkUserExistsAndConfirmed(email, null)
    await this._userModel
      .create({
        userName,
        provider: providerEnum.system,
        email: { data: email },
        password: Globalhash({ plainText: passwordSchema.password }),
        age: BirthDate ? { data: BirthDate } : undefined,
        phone: phone
          ? { data: Globalencrypt({ plainText: phone }) }
          : undefined,
        gender: gender ? { data: gender } : undefined,
      })
      .catch(err => {
        ErrorInternalServerError(
          `error in creating user or failed to send email *${err}`,
        )
      })
    const emailData = generateOtp()
    servicesHelpers.fireMailEvent(email, mailEnum.confirmSingUp, emailData)
    SuccessResponse({ res, data: 'please confirm your email' })
  }
  logIn = async (req, res, next) => {
    const { email, password, fcm } = req.body
    const user = await servicesHelpers.checkUserExistsAndConfirmed(email, true)
    if (
      !GlobalCompare({
        plainText: password,
        hashText: user.password,
      })
    ) {
      return ErrorUnAuthorizedRequest('wrong password')
    }
    let recordedFcms = await this._redisServices.getSet({
      filter: email,
      subject: cacheKeyEnum.fcm,
    })
    if (recordedFcms) {
      await this._redisServices.addSet(
        {
          filter: email,
          subject: cacheKeyEnum.fcm,
        },
        fcm,
      )
    } else if (!recordedFcms.includes(fcm)) {
      recordedFcms.push(fcm)
      await this._redisServices.addSet(
        {
          filter: email,
          subject: cacheKeyEnum.fcm,
        },
        recordedFcms,
      )
    }
    if (user?.twoStepVerification == true) {
      const emailData = generateOtp()
      servicesHelpers.fireMailEvent(email, mailEnum.confirmLoginIn, emailData)
      SuccessResponse({
        res,
        data: 'please confirm your login',
      })
    }
    SuccessResponse({
      res,
      data: servicesHelpers.generateTokens(user),
    })
  }
  generateAccessToken = async (req, res, next) => {
    const { authorization } = req.headers
    const [prefix, token] = authorization.split(' ')
    let secret =
      prefix == TOKEN_ADMIN_PREFIX
        ? SECRET_ADMIN_REFRESH_TOKEN
        : SECRET_USER_REFRESH_TOKEN
    const verifyToken = TokenVerify({
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
