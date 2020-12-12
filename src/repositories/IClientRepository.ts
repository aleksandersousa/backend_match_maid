import { Client } from '../entities/Client'
import { ClientLocation } from '../entities/ClientLocation'

export interface IClientRepository {
  findClientByEmail(email: string): Promise<Client>
  findClientById(id: number): Promise<Client>
  saveClient(client: Client, location: ClientLocation): Promise<void>
  deleteClient(cpf: string): Promise<void>
  updateClient(client: Client, id: number): Promise<void>
  updateClientLocation(location: ClientLocation): Promise<void>
  getClient(id: number, all?: boolean): Promise<Object>
  getClients(): Promise<[Client]>
  listAllClients(): Promise<[Object]>
}
