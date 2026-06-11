import {
  generateAccessToken,
  generateRefreshToken,
} from '../../common/security/jsonWebTokens.js'
import { ErrorConflict } from '../../common/utils/globalresponse.js'
import userModel from '../../DataBase/models/user.model.js'
class servicesHelpers {
  generateTokens(user) {
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    })
    const refreshToken = generateRefreshToken({
      userId: user.id,
      role: user.role,
    })
    return { accessToken, refreshToken }
  }

  checkUserExistsAndConfirmed = async email => {
    const emailExists = await userModel.findOne({
      filter: {
        email,
      },
    })
    return emailExists
  }
}
export default new servicesHelpers()
