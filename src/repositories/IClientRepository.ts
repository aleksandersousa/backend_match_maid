import { Client } from 'src/entities/Client'

export interface IClientRepository {
  findByEmail(email: string): Promise<Client>
  save(client: Client): Promise<void>
}
