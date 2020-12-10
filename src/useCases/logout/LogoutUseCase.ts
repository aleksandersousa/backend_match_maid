import { ILogoutRequestDTO } from './LogoutDTO'
import { client } from '../../helpers/initRedis'
import { verifyRefreshToken } from '../../helpers/jwtHelpers'

export class LogoutUseCase {
  async execute (data: ILogoutRequestDTO) {
    if (!data.refreshToken) {
      throw new Error('Missing refresh token.')
    }

    const userEmail = await verifyRefreshToken(data.refreshToken) as string

    const del = new Promise((resolve, reject) => {
      client.del(userEmail, (err, val) => {
        if (err) {
          return reject(new Error(err.message))
        }
        return resolve(val)
      })
    })

    return await del.then((results) => {
      if (results) {
        return results
      }
    }).catch((err) => {
      return new Error(err)
    })
  }
}
