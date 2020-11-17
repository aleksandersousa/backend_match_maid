import { Request, Response } from 'express'
import { CreateUserMaidUseCase } from './CreateUserMaidUseCase'

export class CreateUserMaidController {
  private _createUserMaidUseCase: CreateUserMaidUseCase

  constructor (createUserMaidUseCase: CreateUserMaidUseCase) {
    this._createUserMaidUseCase = createUserMaidUseCase
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
      location
    } = request.body

    try {
      await this._createUserMaidUseCase.execute({
        cpf,
        name,
        email,
        password,
        phoneNumber,
        birthDate,
        status,
        location
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
