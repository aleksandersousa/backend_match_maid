import { Client } from '../../entities/Client'
import { IClientRepository } from '../../repositories/IClientRepository'
import { ICreateUserClientRequestDTO } from './CreateUserClientDTO'

export class CreateUserClientUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (data: ICreateUserClientRequestDTO) {
    const clientAlreadyExists = await this._clientRepository.findClientByEmail(data.email)

    if (clientAlreadyExists) {
      throw new Error('Client already exists.')
    }

    const client = new Client(data)

    await this._clientRepository.saveClient(client)
  }
}
