import { Request, Response } from 'express'
import { UpdateDisponiblePeriodUseCase } from './UpdateDisponiblePeriodUseCase'

export class UpdateDisponiblePeriodController {
  private _updateMaidDisponiblePeriodUseCase: UpdateDisponiblePeriodUseCase

  constructor (updateDisponiblePeriodUseCase: UpdateDisponiblePeriodUseCase) {
    this._updateMaidDisponiblePeriodUseCase = updateDisponiblePeriodUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.id as unknown as number
    const {
      morning,
      afternoon,
      night
    } = request.body

    try {
      await this._updateMaidDisponiblePeriodUseCase.execute({
        morning,
        afternoon,
        night
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
