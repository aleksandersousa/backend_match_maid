import { Request, Response } from 'express'
import { CreateMaidUseCase } from './CreateMaidUseCase'
import bcrypt from 'bcrypt'

export class CreateMaidController {
  private _createMaidUseCase: CreateMaidUseCase

  constructor (createMaidUseCase: CreateMaidUseCase) {
    this._createMaidUseCase = createMaidUseCase
  }

  async handle (request: Request, response: Response): Promise<Response> {
    const {
      cpf,
      name,
      email,
      password,
      phoneNumber,
      birthDate,
      status,
      bibliography,
      pricePerHour,
      numberOfVisits,
      image,
      location,
      disponibleDays,
      disponiblePeriod,
      services
    } = request.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      await this._createMaidUseCase.execute({
        cpf,
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        birthDate,
        status,
        bibliography,
        pricePerHour,
        numberOfVisits,
        image
      }, location, disponibleDays, disponiblePeriod, services)

      return response.status(201).send({
        error: false,
        message: 'Maid added successfuly!'
      })
    } catch (err) {
      return response.status(400).send({
        error: true,
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
