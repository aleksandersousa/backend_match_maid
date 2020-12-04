import { Request, Response } from 'express'
import { FindMaidByIdUseCase } from './GetMaidByIdUseCase'

export class FindMaidByIdController {
  private _findMaidByIdUseCase: FindMaidByIdUseCase

  constructor (findMaidByIdUseCase: FindMaidByIdUseCase) {
    this._findMaidByIdUseCase = findMaidByIdUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.id as unknown as number

    try {
      const results = await this._findMaidByIdUseCase.execute({ id })
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
