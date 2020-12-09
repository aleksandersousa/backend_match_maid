import { ClientLocation } from '../../entities/ClientLocation'
import { Client } from '../../entities/Client'
import { IClientRepository } from '../../repositories/IClientRepository'
import { IClientLocation, ICreateClientRequestDTO } from './CreateClientDTO'
import { ClientValidations } from '../../validations/client/ClientValidations'

export class CreateClientUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (data: ICreateClientRequestDTO, location: IClientLocation) {
    const clientAlreadyExists = await this._clientRepository.findClientByEmail(data.email)
    const clients = await this._clientRepository.getClients()

    if (clientAlreadyExists) {
      throw new Error('There is already a registration with this email.')
    } else if (data.cpf !== location.clientCpf) {
      throw new Error('Cpfs different.')
    }

    for (let i = 0; i < clients.length; i++) {
      if (clients[i].cpf === data.cpf) {
        throw new Error('Error: ER_DUP_ENTRY: Duplicate entry cpf for key client.cpf')
      }
    }

    const client = new Client(data)
    const clientLocation = new ClientLocation(location)
    const clientValidations = new ClientValidations()

    const errorClient = clientValidations.checkClientError(client)
    const errorClientLocation = clientValidations.checkClientLocationError(clientLocation)

    if (errorClient) {
      throw new Error(errorClient.message)
    } else if (errorClientLocation) {
      throw new Error(errorClientLocation.message)
    }

    await this._clientRepository.saveClient(client, clientLocation)
  }
}
