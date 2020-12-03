import { Request, Response } from 'express'
import { UpdateDisponibleDaysUseCase } from './UpdateDisponibleDaysUseCase'

export class UpdateDisponibleDaysController {
  private _updateDisponibleDaysUseCase: UpdateDisponibleDaysUseCase

  constructor (updateDisponibleDaysUseCase: UpdateDisponibleDaysUseCase) {
    this._updateDisponibleDaysUseCase = updateDisponibleDaysUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.id as unknown as number
    const {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    } = request.body

    try {
      await this._updateDisponibleDaysUseCase.execute({
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
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
