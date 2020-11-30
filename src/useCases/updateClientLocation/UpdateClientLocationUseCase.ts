import { ClientLocation } from '../../entities/ClientLocation'
import { ClientValidations } from '../../validations/client/ClientValidations'
import { IClientRepository } from '../../repositories/IClientRepository'
import { IUpdateClientLocationRequestDTO } from './UpdateClientLocationDTO'

export class UpdateClientLocationUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (data: IUpdateClientLocationRequestDTO, clientCpf: string) {
    const clientExists = await this._clientRepository.findClientByCpf(clientCpf)

    if (!clientExists) {
      throw new Error('Client does not exist.')
    }

    const clientLocation = new ClientLocation(data)
    const clientValidations = new ClientValidations()

    const error = clientValidations.checkClientLocationError(clientLocation)

    if (error) {
      throw new Error(error.message)
    }

    await this._clientRepository.updateClientLocation(clientLocation)
  }
}
