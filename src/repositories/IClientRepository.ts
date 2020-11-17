import { Client } from '../entities/Client'
import { ClientLocation } from '../entities/ClientLocation'

export interface IClientRepository {
  findClientByEmail(email: string): Promise<Client>
  saveClient(client: Client, location: ClientLocation): Promise<void>
}
