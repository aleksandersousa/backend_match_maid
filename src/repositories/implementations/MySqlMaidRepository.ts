import { Client } from '../../entities/Client'
import { ClientLocation } from '../../entities/ClientLocation'
import { Maid } from '../../entities/Maid'
import { MaidLocation } from '../../entities/MaidLocation'
import { MySqlDatabase } from '../../config/MysqlDatabase'
import { IMaidRepository } from '../IMaidRepository'

export class MySqlMaidRepository implements IMaidRepository {
  private mysqlDatabase = new MySqlDatabase()

  async findByEmail (email: string): Promise<Maid> {
    return await this.mysqlDatabase.findMaidByEmail(email)
  }

  async saveMaid (maid: Maid, client: Client, maidLocation: MaidLocation,
    clientLocation: ClientLocation): Promise<void> {
    return await this.mysqlDatabase.saveMaid(maid, client, maidLocation, clientLocation)
  }
}
