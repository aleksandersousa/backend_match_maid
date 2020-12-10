import { Request, Response } from 'express'
import { CreateClientUseCase } from './CreateClientUseCase'
import bcrypt from 'bcrypt'
import { signAcessToken, signRefreshToken } from 'src/helpers/jwtHelpers'

export class CreateClientController {
  private _createClientUseCase: CreateClientUseCase

  constructor (createClientUseCase: CreateClientUseCase) {
    this._createClientUseCase = createClientUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const {
      cpf,
      name,
      email,
      password,
      phoneNumber,
      birthDate,
      image,
      location
    } = request.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      await this._createClientUseCase.execute({
        cpf,
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        birthDate,
        image
      }, location)

      const accessToken = await signAcessToken(email)
      const refreshToken = await signRefreshToken(email)

      return response.status(201).send({
        error: false,
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    } catch (err) {
      return response.status(400).json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
