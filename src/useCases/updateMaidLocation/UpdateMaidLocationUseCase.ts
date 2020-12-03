import { MaidLocation } from '../../entities/MaidLocation'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { MaidValidations } from '../../validations/maid/MaidValidations'
import { IUpdateMaidLocationRequestDTO } from './UpdateMaidLocationDTO'

export class UpdateMaidLocationUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: IUpdateMaidLocationRequestDTO, id: number) {
    const maidAlreadyExists = await this._maidRepository.findMaidById(id)

    if (!maidAlreadyExists) {
      throw new Error('Maid does not exist.')
    }

    const maidLocation = new MaidLocation({
      maidCpf: maidAlreadyExists.cpf,
      latitude: data.latitude,
      longitude: data.longitude,
      street: data.street,
      houseNumber: data.houseNumber,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      cep: data.cep,
      uf: data.uf
    })

    const maidValidations = new MaidValidations()

    const error = maidValidations.checkMaidLocationError(maidLocation)

    if (error) {
      throw new Error(error.message)
    }

    await this._maidRepository.updateMaidLocation(maidLocation)
  }
}
