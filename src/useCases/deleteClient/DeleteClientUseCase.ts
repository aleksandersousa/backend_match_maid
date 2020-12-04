import { IClientRepository } from '../../repositories/IClientRepository'
import { IDeleteClientRequestDTO } from './DeleteClientDTO'

export class DeleteClientUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (data: IDeleteClientRequestDTO) {
    const clientExists = await this._clientRepository.findClientById(data.id)

    if (!clientExists) {
      throw new Error('Client does not exist.')
    }

    await this._clientRepository.deleteClient(clientExists.cpf)
  }
}
