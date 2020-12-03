import { Services } from '../../entities/Services'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { MaidValidations } from '../../validations/maid/MaidValidations'
import { IUpdateServicesRequestDTO } from './UpdateServicesDTO'

export class UpdateServicesUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IUpdateServicesRequestDTO, id: number) {
    const maidAlreadyExists = await this._maidRepository.findMaidById(id)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const services = new Services({
      maidCpf: maidAlreadyExists.cpf,
      nanny: data.nanny,
      careHouse: data.careHouse,
      cleanHouse: data.cleanHouse,
      ironClothes: data.ironClothes,
      washClothes: data.washClothes,
      washDishes: data.washDishes,
      cook: data.cook
    })

    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidServicesError(services)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaidServices(services)
  }
}
