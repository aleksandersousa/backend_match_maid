import { Request, Response } from 'express'
import { UpdateClientUseCase } from './UpdateClientUseCase'

export class UpdateClientController {
  private _updateClientUseCase: UpdateClientUseCase

  constructor (updateClientUseCase: UpdateClientUseCase) {
    this._updateClientUseCase = updateClientUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.cpf
    const {
      cpf,
      name,
      email,
      password,
      phoneNumber,
      birthDate
    } = request.body

    try {
      await this._updateClientUseCase.execute({
        cpf,
        name,
        email,
        password,
        phoneNumber,
        birthDate
      }, id)
      return response.status(204).send()
    } catch (err) {
      return response.status(400).json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
