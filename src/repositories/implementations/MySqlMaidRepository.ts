import { Client } from '../../entities/Client'
import { ClientLocation } from '../../entities/ClientLocation'
import { Maid } from '../../entities/Maid'
import { MaidLocation } from '../../entities/MaidLocation'
import { MySqlDatabase } from '../../config/MysqlDatabase'
import { IMaidRepository } from '../IMaidRepository'
import { DisponibleDays } from 'src/entities/DisponibleDays'
import { DisponiblePeriod } from 'src/entities/DisponiblePeriod'
import { Services } from 'src/entities/Services'

export class MySqlMaidRepository implements IMaidRepository {
  private mysqlDatabase = new MySqlDatabase()

  async findByEmail (email: string): Promise<Maid> {
    return await this.mysqlDatabase.findMaidByEmail(email)
  }

  async saveMaid (
    maid: Maid, maidLocation: MaidLocation, disponibleDays: DisponibleDays,
    disponiblePeriod: DisponiblePeriod, services: Services, client: Client,
    clientLocation: ClientLocation
  ): Promise<void> {
    return await this.mysqlDatabase.saveMaid(
      maid,
      maidLocation,
      disponibleDays,
      disponiblePeriod,
      services,
      client,
      clientLocation
    )
  }
}
