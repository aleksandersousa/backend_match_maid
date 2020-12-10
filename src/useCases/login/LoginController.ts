import { Request, Response } from 'express'
import { LoginUseCase } from './LoginUseCase'
import { ACESS_TOKEN_SECRET } from '../../endpoints'
import jwt from 'jsonwebtoken'

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
      if (await this._loginUseCase.execute({ email, password })) {
        const user = { email: email }

        const accessToken = jwt.sign(user, ACESS_TOKEN_SECRET)

        return response.status(200).send({
          error: false,
          token: accessToken
        })
      } else {
        return response.status(200).send({
          error: true,
          token: 'Not Allowed.'
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
