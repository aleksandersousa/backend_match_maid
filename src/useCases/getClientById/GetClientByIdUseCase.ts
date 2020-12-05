import { IClientRepository } from 'src/repositories/IClientRepository'
import { IGetClientByIdRequestDTO } from './GetClientByIdRequestDTO'

export class GetClientByIdUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (data: IGetClientByIdRequestDTO): Promise<Object> {
    return await this._clientRepository.getClient(data.id)
  }
}
