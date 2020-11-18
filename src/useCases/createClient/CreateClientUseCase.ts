import { ClientLocation } from '../../entities/ClientLocation'
import { Client } from '../../entities/Client'
import { IClientRepository } from '../../repositories/IClientRepository'
import { IClientLocation, ICreateClientRequestDTO } from './CreateClientDTO'

export class CreateClientUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (data: ICreateClientRequestDTO, location: IClientLocation) {
    const clientAlreadyExists = await this._clientRepository.findClientByEmail(data.email)

    if (clientAlreadyExists) {
      throw new Error('Client already exists.')
    }

    const client = new Client(data)
    const clientLocation = new ClientLocation(location)

    await this._clientRepository.saveClient(client, clientLocation)
  }
}
