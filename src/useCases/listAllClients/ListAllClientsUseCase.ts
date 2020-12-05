import { IClientRepository } from '../../repositories/IClientRepository'

export class ListAllClientsUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (): Promise<[Object]> {
    return await this._clientRepository.listAllClients()
  }
}
