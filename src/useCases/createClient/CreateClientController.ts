import { Request, Response } from 'express'
import { CreateClientUseCase } from './CreateClientUseCase'

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
      location
    } = request.body

    try {
      await this._createClientUseCase.execute({
        cpf,
        name,
        email,
        password,
        phoneNumber,
        birthDate
      }, location)
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
