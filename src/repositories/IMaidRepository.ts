import { Client } from '../entities/Client'
import { MaidLocation } from '../entities/MaidLocation'
import { Maid } from '../entities/Maid'
import { ClientLocation } from '../entities/ClientLocation'
import { DisponibleDays } from '../entities/DisponibleDays'
import { DisponiblePeriod } from '../entities/DisponiblePeriod'
import { Services } from '../entities/Services'

export interface IMaidRepository {
  findByEmail(email: string): Promise<Maid>
  saveMaid(
    maid: Maid, location: MaidLocation, disponibleDays: DisponibleDays,
    disponiblePeriod: DisponiblePeriod, services: Services, client: Client,
    clientLocation: ClientLocation
  ): Promise<void>
}
