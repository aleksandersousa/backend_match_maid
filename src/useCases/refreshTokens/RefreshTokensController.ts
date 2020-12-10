import { Request, Response } from 'express'
import { RefreshTokensUseCase } from './RefreshTokensUseCase'

export class RefreshTokensController {
  private _refreshTokensUseCase: RefreshTokensUseCase

  constructor (refreshTokensUseCase: RefreshTokensUseCase) {
    this._refreshTokensUseCase = refreshTokensUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body

    try {
      const results = await this._refreshTokensUseCase.execute({ refreshToken })

      return response.status(200).send({
        error: false,
        accessToken: results.accessToken,
        refreshToken: results.refreshToken
      })
    } catch (err) {
      return response.status(400).send({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
