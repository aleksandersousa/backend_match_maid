import { Client } from 'src/entities/Client'
import { Maid } from 'src/entities/Maid'
import { MySqlDatabase } from '../../config/MysqlDatabase'
import { IMaidRepository } from '../IMaidRepository'

export class MySqlMaidRepository implements IMaidRepository {
  private mysqlDatabase = new MySqlDatabase()

  async findByEmail (email: string): Promise<Maid> {
    return await this.mysqlDatabase.findMaidByEmail(email)
  }

  async saveMaid (maid: Maid, client: Client): Promise<void> {
    return await this.mysqlDatabase.saveMaid(maid, client)
  }
}
