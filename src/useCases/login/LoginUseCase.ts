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
    const clientAlreadyExists = await this._clientRepository.findClientByEmail(data.email)

    if (!maidAlreadyExists) {
      if (!clientAlreadyExists) {
        throw new Error('Can not find user.')
      }

      try {
        const client = await this._clientRepository.getClient(clientAlreadyExists.id, true)
        const results = {
          exists: await bcrypt.compare(data.password, clientAlreadyExists.password),
          isMaid: false,
          clientId: clientAlreadyExists.id,
          user: client
        }
        return results
      } catch (err) {
        throw new Error(err)
      }
    }

    try {
      const maid = await this._maidRepository.getMaid(maidAlreadyExists.id, true)
      const results = {
        exists: await bcrypt.compare(data.password, maidAlreadyExists.password),
        isMaid: true,
        clientId: clientAlreadyExists.id,
        user: maid
      }
      return results
    } catch (err) {
      throw new Error(err)
    }
  }
}
