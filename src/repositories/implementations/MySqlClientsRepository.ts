import { Client } from 'src/entities/Client'
import { IClientRepository } from '../IClientRepository'
import { MySqlDatabase } from '../../config/MysqlDatabase'

export class MySqlClientsRepository implements IClientRepository {
  private mysqlDatabase = new MySqlDatabase()

  async findByEmail (email: string): Promise<Client> {
    return await this.mysqlDatabase.findByEmail(email)
  }

  async save (client: Client): Promise<void> {
    return await this.mysqlDatabase.save(client)
  }
}
