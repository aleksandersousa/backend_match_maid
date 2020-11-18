import { Request, Response } from 'express'
import { CreateMaidUseCase } from './CreateMaidUseCase'

export class CreateUserMaidController {
  private _createMaidUseCase: CreateMaidUseCase

  constructor (createUserMaidUseCase: CreateMaidUseCase) {
    this._createMaidUseCase = createUserMaidUseCase
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
      location,
      disponibleDays,
      disponiblePeriod,
      services
    } = request.body

    try {
      await this._createMaidUseCase.execute({
        cpf,
        name,
        email,
        password,
        phoneNumber,
        birthDate,
        status,
        location,
        disponibleDays,
        disponiblePeriod,
        services
      })
      return response.status(201).send({
        error: false,
        message: 'Maid added successfuly!'
      })
    } catch (err) {
      return response.status(400).json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}