import { Client } from '../entities/Client'
import { ClientLocation } from '../entities/ClientLocation'

export interface IClientRepository {
  findClientByEmail(email: string): Promise<Client>
  findClientByCpf(cpf: string): Promise<Client>
  saveClient(client: Client, location: ClientLocation): Promise<void>
  saveClientLocation(location: ClientLocation): Promise<void>
  deleteClient(cpf: string): Promise<void>
}
