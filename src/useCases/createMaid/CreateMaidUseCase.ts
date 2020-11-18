import { Maid } from '../../entities/Maid'
import { Client } from '../../entities/Client'
import { IMaidRepository } from '../../repositories/IMaidRepository'
import { ClientLocation } from '../../entities/ClientLocation'
import { MaidLocation } from '../../entities/MaidLocation'
import { DisponibleDays } from '../../entities/DisponibleDays'
import { DisponiblePeriod } from '../../entities/DisponiblePeriod'
import { Services } from '../../entities/Services'
import { ICreateMaidRequestDTO, IMaidLocation } from './CreateMaidDTO'

export class CreateMaidUseCase {
  private _maidRepository: IMaidRepository

  constructor (maidRepository: IMaidRepository) {
    this._maidRepository = maidRepository
  }

  async execute (data: ICreateMaidRequestDTO, location: IMaidLocation,
    disponibleDays: DisponibleDays, disponiblePeriod: DisponiblePeriod, services: Services) {
    const maidAlreadyExists = await this._maidRepository.findMaidByEmail(data.email)

    if (maidAlreadyExists) {
      throw new Error('Maid already exists.')
    }

    const maid = new Maid(data)
    const maidDisponibleDays = new DisponibleDays(disponibleDays)
    const maidDisponiblePeriod = new DisponiblePeriod(disponiblePeriod)
    const maidServices = new Services(services)

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
