import { Request, Response } from 'express'
import { UpdateMaidLocationUseCase } from './UpdateMaidLocationUseCase'

export class UpdateMaidLocationController {
  private _updateMaidLocationUseCase: UpdateMaidLocationUseCase

  constructor (updateMaidLocationUseCase: UpdateMaidLocationUseCase) {
    this._updateMaidLocationUseCase = updateMaidLocationUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.id as unknown as number
    const {
      latitude,
      longitude,
      street,
      houseNumber,
      complement,
      neighborhood,
      city,
      cep,
      uf
    } = request.body

    try {
      await this._updateMaidLocationUseCase.execute({
        latitude,
        longitude,
        street,
        houseNumber,
        complement,
        neighborhood,
        city,
        cep,
        uf
      }, id)
      return response.status(204).send({})
    } catch (err) {
      return response.status(400).json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
