import { Request, Response } from 'express'
import { ListAllClientsUseCase } from './ListAllClientsUseCase'

export class ListAllClientsController {
  private _listAllClientsUseCase: ListAllClientsUseCase

  constructor (listAllClientsUseCase: ListAllClientsUseCase) {
    this._listAllClientsUseCase = listAllClientsUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      return response.send(await this._listAllClientsUseCase.execute())
    } catch (err) {
      return response.json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
