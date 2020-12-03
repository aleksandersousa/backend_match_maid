import { ClientLocation } from '../../entities/ClientLocation'
import { ClientValidations } from '../../validations/client/ClientValidations'
import { IClientRepository } from '../../repositories/IClientRepository'
import { IUpdateClientLocationRequestDTO } from './UpdateClientLocationDTO'

export class UpdateClientLocationUseCase {
  private _clientRepository: IClientRepository

  constructor (clientRepository: IClientRepository) {
    this._clientRepository = clientRepository
  }

  async execute (data: IUpdateClientLocationRequestDTO, id: number) {
    const clientExists = await this._clientRepository.findClientById(id)

    if (!clientExists) {
      throw new Error('Client does not exist.')
    }

    const clientLocation = new ClientLocation({
      clientCpf: clientExists.cpf,
      latitude: data.latitude,
      longitude: data.longitude,
      street: data.street,
      houseNumber: data.houseNumber,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      cep: data.cep,
      uf: data.uf
    })

    const clientValidations = new ClientValidations()

    const error = clientValidations.checkClientLocationError(clientLocation)

    if (error) {
      throw new Error(error.message)
    }

    await this._clientRepository.updateClientLocation(clientLocation)
  }
}
