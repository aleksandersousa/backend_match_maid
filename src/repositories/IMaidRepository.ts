import { Client } from '../entities/Client'
import { MaidLocation } from '../entities/MaidLocation'
import { Maid } from '../entities/Maid'
import { ClientLocation } from '../entities/ClientLocation'
import { DisponibleDays } from '../entities/DisponibleDays'
import { DisponiblePeriod } from '../entities/DisponiblePeriod'
import { Services } from '../entities/Services'

export interface IMaidRepository {
  saveMaid(
    maid: Maid, location: MaidLocation, disponibleDays: DisponibleDays,
    disponiblePeriod: DisponiblePeriod, services: Services, client: Client,
    clientLocation: ClientLocation
  ): Promise<void>
  saveMaidLocation(location: MaidLocation): Promise<void>
  saveMaidDisponibleDays(disponibleDays: DisponibleDays): Promise<void>
  saveMaidDisponiblePeriod(disponiblePeriod: DisponiblePeriod): Promise<void>
  saveMaidServices(services: Services): Promise<void>
  findMaidByEmail(email: string): Promise<Maid>
  findMaidByCpf(cpf: string): Promise<Maid>
  deleteMaid(cpf: string): Promise<void>
}
