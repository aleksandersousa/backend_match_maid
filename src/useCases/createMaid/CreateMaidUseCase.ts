import { Maid } from '../../entities/Maid'
import { Client } from '../../entities/Client'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { ICreateMaidRequestDTO } from './CreateMaidDTO'

export class CreateMaidUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: ICreateMaidRequestDTO) {
    const maidAlreadyExists = await this._maidRepository.findByEmail(data.email)

    if (maidAlreadyExists) {
      throw new Error('Maid already exists.')
    }

    const maid = new Maid(data)

    const client: Client = {
      cpf: maid.cpf,
      name: maid.name,
      email: maid.email,
      password: maid.password,
      phoneNumber: maid.phoneNumber,
      birthDate: maid.birthDate,
      location: {
        clientCpf: maid.location.maidCpf,
        latitude: maid.location.latitude,
        longitude: maid.location.longitude,
        street: maid.location.street,
        houseNumber: maid.location.houseNumber,
        neighborhood: maid.location.neighborhood,
        city: maid.location.city,
        cep: maid.location.cep,
        uf: maid.location.uf
      }
    }

    await this._maidRepository.saveMaid(
      maid,
      maid.location,
      maid.disponibleDays,
      maid.disponiblePeriod,
      maid.services,
      client,
      client.location
    )
  }
}
