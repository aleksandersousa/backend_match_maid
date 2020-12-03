import { Request, Response } from 'express'
import { DeleteMaidUseCase } from './DeleteMaidUseCase'

export class DeleteMaidController {
  private _deleteMaidUseCase: DeleteMaidUseCase

  constructor (deleteMaidUseCase: DeleteMaidUseCase) {
    this._deleteMaidUseCase = deleteMaidUseCase
  }

  async handle (request: Request, response: Response) {
    const id = request.params.id as unknown as number

    try {
      await this._deleteMaidUseCase.execute({ id })
      return response.status(204).send()
    } catch (err) {
      return response.status(400).json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
