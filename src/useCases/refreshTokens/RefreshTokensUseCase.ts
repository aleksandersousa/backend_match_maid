import { signAcessToken, signRefreshToken, verifyRefreshToken } from 'src/helpers/jwtHelpers'
import { IRefreshTokensRequestDTO } from './RefreshTokensDTO'

export class RefreshTokensUseCase {
  async execute (data: IRefreshTokensRequestDTO) {
    if (!data.refreshToken) {
      throw new Error('Missing refresh token.')
    }

    const userEmail = await verifyRefreshToken(data.refreshToken)

    const accessToken = await signAcessToken(userEmail)
    const refreshToken = await signRefreshToken(userEmail)

    return { accessToken, refreshToken }
  }
}
