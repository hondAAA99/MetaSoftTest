import {
  generateAccessToken,
  generateRefreshToken,
} from '../../common/security/jsonWebTokens.js'
import userRepo from '../../DataBase/repo/user.repo.js'
import { ErrorConflict } from '../../common/utils/globalresponse.js'
class servicesHelpers {
  _userModel = new userRepo()
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

  checkUserExistsAndConfirmed = async (email, confirmed) => {
    const emailExists = await this._userModel.findOne({
      filter:
        confirmed == true
          ? { 'email.data': email, confirmed: true }
          : { 'email.data': email },
    })
    if (confirmed == null) {
      if (emailExists) return ErrorConflict('email already exists')
    } else if (confirmed == false || confirmed == true) {
      if (!emailExists) return ErrorConflict('email is not exists exists')
    }
    return emailExists
  }
}
export default new servicesHelpers()
