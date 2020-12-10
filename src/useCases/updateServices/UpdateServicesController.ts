import { Request, Response } from 'express'
import { UpdateServicesUseCase } from './UpdateServicesUseCase'

export class UpdateServicesController {
  private _updateServicesUseCase: UpdateServicesUseCase

  constructor (updateServicesUseCase: UpdateServicesUseCase) {
    this._updateServicesUseCase = updateServicesUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.id as unknown as number
    const {
      nanny,
      careHouse,
      cleanHouse,
      ironClothes,
      washClothes,
      washDishes,
      cook
    } = request.body

    try {
      await this._updateServicesUseCase.execute({
        nanny,
        careHouse,
        cleanHouse,
        ironClothes,
        washClothes,
        washDishes,
        cook
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
