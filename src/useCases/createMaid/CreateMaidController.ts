import { Request, Response } from 'express'
import { CreateMaidUseCase } from './CreateMaidUseCase'
import bcrypt from 'bcrypt'
import { signAcessToken, signRefreshToken } from 'src/helpers/jwtHelpers'

export class CreateMaidController {
  private _createMaidUseCase: CreateMaidUseCase

  constructor (createMaidUseCase: CreateMaidUseCase) {
    this._createMaidUseCase = createMaidUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const {
      cpf,
      name,
      email,
      password,
      phoneNumber,
      birthDate,
      status,
      bibliography,
      pricePerHour,
      numberOfVisits,
      image,
      location,
      disponibleDays,
      disponiblePeriod,
      services
    } = request.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      await this._createMaidUseCase.execute({
        cpf,
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        birthDate,
        status,
        bibliography,
        pricePerHour,
        numberOfVisits,
        image
      }, location, disponibleDays, disponiblePeriod, services)

      const accessToken = await signAcessToken(email)
      const refreshToken = await signRefreshToken(email)

      return response.status(201).send({
        error: false,
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    } catch (err) {
      return response.status(400).send({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
