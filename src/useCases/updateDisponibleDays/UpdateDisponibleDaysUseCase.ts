import { DisponibleDays } from '../../entities/DisponibleDays'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { MaidValidations } from '../../validations/maid/MaidValidations'
import { IUpdateDisponibleDaysRequestDTO } from './UpdateDisponibleDaysDTO'

export class UpdateDisponibleDaysUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IUpdateDisponibleDaysRequestDTO, id: number) {
    const maidAlreadyExists = await this._maidRepository.findMaidById(id)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const disponibleDays = new DisponibleDays({
      maidCpf: maidAlreadyExists.cpf,
      monday: data.monday,
      tuesday: data.tuesday,
      wednesday: data.wednesday,
      thursday: data.thursday,
      friday: data.friday,
      saturday: data.saturday,
      sunday: data.sunday
    })

    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidDisponibleDaysError(disponibleDays)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaidDisponibleDays(disponibleDays)
  }
}
