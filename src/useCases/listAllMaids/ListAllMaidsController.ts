import { Request, Response } from 'express'
import { ListAllMaidsUseCase } from './ListAllMaidsUseCase'

export class ListAllMaidsController {
  private _listAllMaidsUseCase: ListAllMaidsUseCase

  constructor (listAllMaidsUseCase: ListAllMaidsUseCase) {
    this._listAllMaidsUseCase = listAllMaidsUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      return response.send(await this._listAllMaidsUseCase.execute())
    } catch (err) {
      return response.json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
