import { Request, Response } from 'express'
import { RateMaidUseCase } from './RateMaidUseCase'

export class RateMaidController {
  private _rateMaidUseCase: RateMaidUseCase

  constructor (rateMaidUseCase: RateMaidUseCase) {
    this._rateMaidUseCase = rateMaidUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const id = request.params.id as unknown as number
    const {
      clientId,
      clientName,
      stars,
      goodWork,
      onTime,
      arrivedOnTime
    } = request.body

    try {
      await this._rateMaidUseCase.execute({
        clientId,
        clientName,
        stars,
        goodWork,
        onTime,
        arrivedOnTime
      }, id)
      return response.status(201).send({
        error: false,
        message: 'Rated maid successfuly!'
      })
    } catch (err) {
      return response.status(400).json({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
