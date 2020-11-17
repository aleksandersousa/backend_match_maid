import { Client } from 'src/entities/Client'
import { ClientLocation } from 'src/entities/ClientLocation'
import { DisponibleDays } from 'src/entities/DisponibleDays'
import { DisponiblePeriod } from 'src/entities/DisponiblePeriod'
import { Maid } from 'src/entities/Maid'
import { MaidLocation } from 'src/entities/MaidLocation'
import { Services } from 'src/entities/Services'

export interface IDatabase {
  saveClient(client: Client, location: ClientLocation): Promise<void>
  saveClientLocation(location: ClientLocation): Promise<void>
  findClientByEmail(email: String): Promise<Object>
  saveMaid(
    maid: Maid, location: MaidLocation, disponibleDays: DisponibleDays,
    disponiblePeriod: DisponiblePeriod, services: Services, client: Client,
    clientLocation: ClientLocation
  ): Promise<void>
  saveMaidLocation(location: MaidLocation): Promise<void>
  saveMaidDisponibleDays(disponibleDays: DisponibleDays): Promise<void>
  saveMaidDisponiblePeriod(disponiblePeriod: DisponiblePeriod): Promise<void>
  saveMaidServices(services: Services): Promise<void>
  findMaidByEmail(email: String): Promise<Object>

}
