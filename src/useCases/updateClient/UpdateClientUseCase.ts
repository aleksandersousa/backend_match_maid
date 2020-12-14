import { Client } from '../../entities/Client'
import { IClientRepository } from '../../repositories/IClientRepository'
import { ClientValidations } from '../../validations/client/ClientValidations'
import { IUpdateClientRequestDTO } from './UpdateClientDTO'

export class UpdateClientUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (data: IUpdateClientRequestDTO, id: number) {
    const clientExists = await this._clientRepository.findClientById(id)

    if (!clientExists) {
      throw new Error('Client does not exist.')
    } else if (clientExists.cpf !== data.cpf) {
      throw new Error('Invalid cpf.')
    }

    const client = new Client(data)
    const clientValidations = new ClientValidations()

    const error = clientValidations.checkClientError(client)

    if (error) {
      throw new Error(error.message)
    }

    await this._clientRepository.updateClient(client, id)
  }
}
