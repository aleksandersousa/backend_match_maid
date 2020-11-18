import { Client } from '../../entities/Client'
import { IClientRepository } from '../../repositories/IClientRepository'
import { ICreateClientRequestDTO } from './CreateClientDTO'

export class CreateClientUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (data: ICreateClientRequestDTO) {
    const clientAlreadyExists = await this._clientRepository.findClientByEmail(data.email)

    if (clientAlreadyExists) {
      throw new Error('Client already exists.')
    }

    const client = new Client(data)

    await this._clientRepository.saveClient(client, client.location)
  }
}
