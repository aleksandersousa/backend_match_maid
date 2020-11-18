import { IClientRepository } from '../../repositories/IClientRepository'
import { ICreateClientRequestDTO } from './CreateClientDTO'

export class CreateClientUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (client: ICreateClientRequestDTO) {
    const clientAlreadyExists = await this._clientRepository.findClientByEmail(client.email)

    if (clientAlreadyExists) {
      throw new Error('Client already exists.')
    }

    await this._clientRepository.saveClient(client, client.location)
  }
}
