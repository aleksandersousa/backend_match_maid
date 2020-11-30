import { MaidLocation } from '../../entities/MaidLocation'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { MaidValidations } from '../../validations/maid/MaidValidations'

export class UpdateMaidLocationUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: MaidLocation, cpf: string) {
    const maidAlreadyExists = await this._maidRepository.findMaidByCpf(cpf)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const maidLocation = new MaidLocation(data)
    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidLocationError(maidLocation)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaidLocation(maidLocation)
  }
}
