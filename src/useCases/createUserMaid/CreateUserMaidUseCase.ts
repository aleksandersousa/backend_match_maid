import { Client } from '../../entities/Client'
import { Maid } from '../../entities/Maid'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { ICreateUserMaidRequestDTO } from './CreateUserMaidDTO'

export class CreateUserMaidUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (
    maidData: ICreateUserMaidRequestDTO
  ) {
    const maidAlreadyExists = await this._maidRepository.findByEmail(maidData.email)

    if (maidAlreadyExists) {
      throw new Error('Maid already exists.')
    }

    const clientData = {
      cpf: maidData.cpf,
      name: maidData.name,
      email: maidData.email,
      password: maidData.password,
      phoneNumber: maidData.phoneNumber,
      birthDate: maidData.birthDate
    }

    const maid = new Maid(maidData)
    const client = new Client(clientData)

    await this._maidRepository.saveMaid(maid, client)
  }
}
