import { Request, Response } from 'express'
import { GetClientByIdUseCase } from './GetClientByIdUseCase'

export class GetClientByIdController {
  private _getClientByIdUseCase: GetClientByIdUseCase

  constructor (getClientByIdUseCase: GetClientByIdUseCase) {
    this._getClientByIdUseCase = getClientByIdUseCase
  }

  async handle (request: Request, response: Response) {
    const id = request.params.id as unknown as number

    try {
      const results = await this._getClientByIdUseCase.execute({ id })
      return response.status(200).send({
        error: false,
        results: results
      })
    } catch (err) {
      return response.status(400).json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
