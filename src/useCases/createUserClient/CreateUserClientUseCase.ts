import { Client } from 'src/entities/Client'
import { IClientRepository } from 'src/repositories/IClientRepository'
import { ICreateUserClientRequestDTO } from './CreateUserClientDTO'

export class CreateUserClientUseCase {
  private _clientRepository: IClientRepository

  constructor (
    clientRepository: IClientRepository
  ) {
    this._clientRepository = clientRepository
  }

  async execute (data: ICreateUserClientRequestDTO) {
    const clientAlreadyExists = await this._clientRepository.findByEmail(data.email)

    if (clientAlreadyExists) {
      throw new Error('Client already exists.')
    }

    const client = new Client(data)

    await this._clientRepository.save(client)
  }
}
