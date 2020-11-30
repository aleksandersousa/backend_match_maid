import { DisponibleDays } from '../../entities/DisponibleDays'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { MaidValidations } from '../../validations/maid/MaidValidations'

export class UpdateDisponibleDaysUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: DisponibleDays, maidCpf: string) {
    const maidAlreadyExists = await this._maidRepository.findMaidByCpf(maidCpf)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const disponibleDays = new DisponibleDays(data)
    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidDisponibleDaysError(disponibleDays)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaidDisponibleDays(disponibleDays)
  }
}
