import { Request, Response } from 'express'
import { LoginUseCase } from './LoginUseCase'
import { signAcessToken, signRefreshToken } from 'src/helpers/jwtHelpers'

export class LoginController {
  private _loginUseCase: LoginUseCase

  constructor (loginUseCase: LoginUseCase) {
    this._loginUseCase = loginUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const {
      email,
      password
    } = request.body

    try {
      const results = await this._loginUseCase.execute({ email, password })
      if (results.exists) {
        const accessToken = await signAcessToken(email)
        const refreshToken = await signRefreshToken(email)

        return response.status(200).send({
          accessToken: accessToken,
          refreshToken: refreshToken,
          isMaid: results.isMaid,
          clientId: results.clientId,
          user: results.user
        })
      } else {
        return response.status(200).send({
          error: true,
          acessToken: 'Not Allowed.'
        })
      }
    } catch (err) {
      return response.status(400).send({
        err: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
