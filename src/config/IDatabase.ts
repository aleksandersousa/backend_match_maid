import { Client } from 'src/entities/Client'
import { ClientLocation } from 'src/entities/ClientLocation'
import { Maid } from 'src/entities/Maid'
import { MaidLocation } from 'src/entities/MaidLocation'

export interface IDatabase {
  saveClient(client: Client, location: ClientLocation): Promise<void>;
  saveClientLocation(location: ClientLocation): Promise<void>;
  saveMaid(maid: Maid, client: Client, location: MaidLocation,
    clientLocation: ClientLocation): Promise<void>;
  saveMaidLocation(location: MaidLocation): Promise<void>;
  findClientByEmail(email: String): Promise<Object>;
  findMaidByEmail(email: String): Promise<Object>;
  // get(id: string): Promise<T>;
  // getAll(): Promise<T[]>;
  // update(id: string, object: T): Promise<void>;
  // delete(id: string): Promise<void>;
}
