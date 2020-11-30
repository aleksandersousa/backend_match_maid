import { Request, Response } from 'express'
import { UpdateMaidUseCase } from './UpdateMaidUseCase'

export class UpdateMaidController {
  private _updateMaidUseCase: UpdateMaidUseCase

  constructor (updateMaidUseCase: UpdateMaidUseCase) {
    this._updateMaidUseCase = updateMaidUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.maidCpf
    const {
      cpf,
      name,
      email,
      password,
      phoneNumber,
      birthDate,
      status
    } = request.body

    try {
      await this._updateMaidUseCase.execute({
        cpf,
        name,
        email,
        password,
        phoneNumber,
        birthDate,
        status
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
