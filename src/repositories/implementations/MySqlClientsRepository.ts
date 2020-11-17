import { Client } from '../../entities/Client'
import { IClientRepository } from '../IClientRepository'
import { MySqlDatabase } from '../../config/MysqlDatabase'
import { ClientLocation } from '../../entities/ClientLocation'

export class MySqlClientsRepository implements IClientRepository {
  private mysqlDatabase = new MySqlDatabase()

  async findClientByEmail (email: string): Promise<Client> {
    return await this.mysqlDatabase.findClientByEmail(email)
  }

  async saveClient (client: Client, location: ClientLocation): Promise<void> {
    return await this.mysqlDatabase.saveClient(client, location)
  }
}
