import { Request, Response } from 'express'
import { UpdateDisponibleDaysUseCase } from './UpdateDisponibleDaysUseCase'

export class UpdateDisponibleDaysController {
  private _updateDisponibleDaysUseCase: UpdateDisponibleDaysUseCase

  constructor (updateDisponibleDaysUseCase: UpdateDisponibleDaysUseCase) {
    this._updateDisponibleDaysUseCase = updateDisponibleDaysUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.maidCpf
    const {
      maidCpf,
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
        maidCpf,
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
