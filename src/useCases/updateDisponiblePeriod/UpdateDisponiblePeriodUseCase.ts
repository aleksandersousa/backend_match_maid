import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { MaidValidations } from '../../validations/maid/MaidValidations'
import { IMaidRepository } from '../../repositories/IMaidRepository'

export class UpdateDisponiblePeriodUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: DisponiblePeriod, maidCpf: string) {
    const maidAlreadyExists = await this._maidRepository.findMaidByCpf(maidCpf)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const disponiblePeriod = new DisponiblePeriod(data)
    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidDisponiblePeriodError(disponiblePeriod)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaidDisponiblePeriod(disponiblePeriod)
  }
}
