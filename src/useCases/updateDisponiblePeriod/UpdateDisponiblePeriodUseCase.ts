import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { MaidValidations } from '../../validations/maid/MaidValidations'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { IUpdateDisponiblePeriodDTO } from './UpdateDisponiblePeriodDTO'

export class UpdateDisponiblePeriodUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IUpdateDisponiblePeriodDTO, id: number) {
    const maidAlreadyExists = await this._maidRepository.findMaidById(id)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const disponiblePeriod = new DisponiblePeriod({
      maidCpf: maidAlreadyExists.cpf,
      morning: data.morning,
      afternoon: data.afternoon,
      night: data.night
    })

    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidDisponiblePeriodError(disponiblePeriod)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaidDisponiblePeriod(disponiblePeriod)
  }
}
