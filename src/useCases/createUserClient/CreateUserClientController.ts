import { Request, Response } from 'express'
import { CreateUserClientUseCase } from './CreateUserClientUseCase'

export class CreateUserClientController {
  private _createUserClientUseCase: CreateUserClientUseCase

  constructor (createUserClientUseCase: CreateUserClientUseCase) {
    this._createUserClientUseCase = createUserClientUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const { cpf, name, email, password, phoneNumber, birthDate } = request.body

    try {
      await this._createUserClientUseCase.execute({
        cpf,
        name,
        email,
        password,
        phoneNumber,
        birthDate
      })
      return response.status(201).send({
        error: false,
        message: 'Client added successfuly!'
      })
    } catch (err) {
      return response.status(400).json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
