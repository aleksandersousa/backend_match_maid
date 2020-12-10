import { Request, Response } from 'express'
import { LogoutUseCase } from './LogoutUseCase'

export class LogoutController {
  private _logoutUseCase: LogoutUseCase

  constructor (logoutUseCase: LogoutUseCase) {
    this._logoutUseCase = logoutUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body

    try {
      await this._logoutUseCase.execute({ refreshToken })
      return response.status(204).send({})
    } catch (err) {
      return response.status(400).send({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
