import { IClientRepository } from 'src/repositories/IClientRepository'
import { IMaidRepository } from 'src/repositories/IMaidRepository'
import { ILoginRequestDTO } from './LoginDTO'
import bcrypt from 'bcrypt'

export class LoginUseCase {
  private _clientRepository: IClientRepository
  private _maidRepository: IMaidRepository

  constructor (clientRepository: IClientRepository, maidRepository: IMaidRepository) {
    this._clientRepository = clientRepository
    this._maidRepository = maidRepository
  }

  async execute (data: ILoginRequestDTO) {
    const maidAlreadyExists = await this._maidRepository.findMaidByEmail(data.email)

    if (!maidAlreadyExists) {
      const clientAlreadyExists = await this._clientRepository.findClientByEmail(data.email)

      if (!clientAlreadyExists) {
        throw new Error('Can not find user.')
      }

      try {
        return await bcrypt.compare(data.password, clientAlreadyExists.password)
      } catch (err) {
        throw new Error(err)
      }
    }

    try {
      return await bcrypt.compare(data.password, maidAlreadyExists.password)
    } catch (err) {
      throw new Error(err)
    }
  }
}
