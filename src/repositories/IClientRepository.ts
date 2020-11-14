import { Client } from 'src/entities/Client'

export interface IClientRepository {
  findClientByEmail(email: string): Promise<Client>
  saveClient(client: Client): Promise<void>
}
