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

export class CreateMaidUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: ICreateMaidRequestDTO, location: IMaidLocation,
    disponibleDays: DisponibleDays, disponiblePeriod: DisponiblePeriod, services: Services
  ) {
    const maidAlreadyExists = await this._maidRepository.findMaidByEmail(data.email)

    if (maidAlreadyExists) {
      throw new Error('Maid already exists.')
    }

    const maid = new Maid(data)
    const maidDisponibleDays = new DisponibleDays(disponibleDays)
    const maidDisponiblePeriod = new DisponiblePeriod(disponiblePeriod)
    const maidServices = new Services(services)

    const maidValidations = new MaidValidations()
    const clientValidations = new ClientValidations()

    const client: Client = {
      cpf: maid.cpf,
      name: maid.name,
      email: maid.email,
      password: maid.password,
      phoneNumber: maid.phoneNumber,
      birthDate: maid.birthDate
    }

    const clientLocation: ClientLocation = {
      clientCpf: location.maidCpf,
      latitude: location.latitude,
      longitude: location.longitude,
      street: location.street,
      houseNumber: location.houseNumber,
      neighborhood: location.neighborhood,
      city: location.city,
      cep: location.cep,
      uf: location.uf
    }

    const maidLocation: MaidLocation = {
      maidCpf: location.maidCpf,
      latitude: location.latitude,
      longitude: location.longitude,
      street: location.street,
      houseNumber: location.houseNumber,
      neighborhood: location.neighborhood,
      city: location.city,
      cep: location.cep,
      uf: location.uf
    }

    const maidError = maidValidations.checkMaidError(maid)
    const maidLocationError = maidValidations.checkMaidLocationError(maidLocation)
    const disponibleDaysError = maidValidations.checkMaidDisponibleDaysError(disponibleDays)
    const disponiblePeriodError = maidValidations.checkMaidDisponiblePeriodError(
      disponiblePeriod
    )
    const servicesError = maidValidations.checkMaidServicesError(services)

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
