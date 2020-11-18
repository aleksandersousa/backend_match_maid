import { Request, Response } from 'express'
import { DeleteClientUseCase } from './DeleteClientUseCase'

export class DeleteClientController {
  private _deleteClientUseCase: DeleteClientUseCase

  constructor (deleteClientUseCase: DeleteClientUseCase) {
    this._deleteClientUseCase = deleteClientUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const cpf = request.query.cpf as string

    try {
      await this._deleteClientUseCase.execute({ cpf })
      return response.status(204).send()
    } catch (err) {
      return response.status(400).json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
