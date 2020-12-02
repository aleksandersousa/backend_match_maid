import { Services } from '../../entities/Services'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { MaidValidations } from '../../validations/maid/MaidValidations'
import { IUpdateServicesRequestDTO } from './UpdateServicesDTO'

export class UpdateServicesUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IUpdateServicesRequestDTO, maidCpf: string) {
    const maidAlreadyExists = await this._maidRepository.findMaidByCpf(maidCpf)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const services = new Services(data)
    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidServicesError(services)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaidServices(services)
  }
}
