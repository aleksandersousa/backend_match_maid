import { ILogoutRequestDTO } from './LogoutDTO'
import { client } from '../../helpers/initRedis'
import { verifyRefreshToken } from '../../helpers/jwtHelpers'

export class LogoutUseCase {
  async execute (data: ILogoutRequestDTO) {
    if (!data.refreshToken) {
      throw new Error('Missing refresh token.')
    }

    const userEmail = await verifyRefreshToken(data.refreshToken) as string

    client.del(userEmail, (err, val) => {
      if (err) {
        return new Error(err.message)
      }
    })
  }
}
