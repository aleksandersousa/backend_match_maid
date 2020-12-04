import { Maid } from '../../entities/Maid'
import { Client } from '../../entities/Client'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { ClientLocation } from '../../entities/ClientLocation'
import { MaidLocation } from '../../entities/MaidLocation'
import { DisponibleDays } from '../../entities/DisponibleDays'
import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { Services } from '../../entities/Services'
import { ICreateMaidRequestDTO, IMaidLocation } from './CreateMaidDTO'
import { MaidValidations } from '../../validations/maid/MaidValidations'
import { ClientValidations } from '../../validations/client/ClientValidations'
import { MySqlClientsRepository } from 'src/repositories/implementations/MySqlClientsRepository'

export class CreateMaidUseCase {
  private _maidRepository: IMaidRepository
  private _clientRepository: MySqlClientsRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
    this._clientRepository = new MySqlClientsRepository()
  }

  async execute (data: ICreateMaidRequestDTO, location: IMaidLocation,
    disponibleDays: DisponibleDays, disponiblePeriod: DisponiblePeriod, services: Services
  ) {
    const maidAlreadyExists = await this._maidRepository.findMaidByEmail(data.email)
    const clientAlreadyExists = await this._clientRepository.findClientByEmail(data.email)
    const existingMaids: [Maid] = await this._maidRepository.getMaids()

    if (maidAlreadyExists || clientAlreadyExists) {
      throw new Error('There is already a registration with this email.')
    } else if (data.cpf !== location.maidCpf || data.cpf !== disponibleDays.maidCpf ||
      data.cpf !== disponiblePeriod.maidCpf || data.cpf !== services.maidCpf) {
      throw new Error('Cpfs differents.')
    }

    for (let i = 0; i < existingMaids.length; i++) {
      if (existingMaids[i].cpf === data.cpf) {
        throw new Error('Error: ER_DUP_ENTRY: Duplicate entry cpf for key maid.cpf')
      }
    }

    const maid = new Maid(data)
    const maidLocation = new MaidLocation(location)
    const maidDisponibleDays = new DisponibleDays(disponibleDays)
    const maidDisponiblePeriod = new DisponiblePeriod(disponiblePeriod)
    const maidServices = new Services(services)

    const maidValidations = new MaidValidations()
    const clientValidations = new ClientValidations()

    const client = new Client({
      cpf: maid.cpf,
      name: maid.name,
      email: maid.email,
      password: maid.password,
      phoneNumber: maid.phoneNumber,
      birthDate: maid.birthDate,
      image: maid.image
    })

    const clientLocation = new ClientLocation({
      clientCpf: location.maidCpf,
      latitude: location.latitude,
      longitude: location.longitude,
      street: location.street,
      houseNumber: location.houseNumber,
      complement: location.complement,
      neighborhood: location.neighborhood,
      city: location.city,
      cep: location.cep,
      uf: location.uf
    })

    const maidError = maidValidations.checkMaidError(maid)
    const maidLocationError = maidValidations.checkMaidLocationError(maidLocation)
    const disponibleDaysError = maidValidations.checkMaidDisponibleDaysError(
      maidDisponibleDays
    )
    const disponiblePeriodError = maidValidations.checkMaidDisponiblePeriodError(
      maidDisponiblePeriod
    )
    const servicesError = maidValidations.checkMaidServicesError(maidServices)

    const clientError = clientValidations.checkClientError(client)
    const clientLocationError = clientValidations.checkClientLocationError(clientLocation)

    if (maidError) {
      throw new Error(maidError.message)
    } else if (maidLocationError) {
      throw new Error(maidLocationError.message)
    } else if (disponibleDaysError) {
      throw new Error(disponibleDaysError.message)
    } else if (disponiblePeriodError) {
      throw new Error(disponiblePeriodError.message)
    } else if (servicesError) {
      throw new Error(servicesError.message)
    } else if (clientError) {
      throw new Error(clientError.message)
    } else if (clientLocationError) {
      throw new Error(clientLocationError.message)
    }

    await this._maidRepository.saveMaid(
      maid,
      maidLocation,
      maidDisponibleDays,
      maidDisponiblePeriod,
      maidServices,
      client,
      clientLocation
    )
  }
}
