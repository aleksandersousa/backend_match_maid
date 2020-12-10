import { Request, Response } from 'express'
import { InteractUseCase } from './InteractUseCase'

export class InteractController {
  private _interactUseCase: InteractUseCase

  constructor (interactUseCase: InteractUseCase) {
    this._interactUseCase = interactUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const {
      clientId,
      maidId,
      accessTime
    } = request.body

    try {
      await this._interactUseCase.execute({ clientId, maidId, accessTime })
      return response.status(201).send({
        error: false,
        message: 'Interaction posted successfuly!'
      })
    } catch (err) {
      return response.status(400).send({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
