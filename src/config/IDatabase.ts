import { Client } from 'src/entities/Client'

export interface IDatabase<T> {
  save(object: T): Promise<void>;
  findByEmail(email: String): Promise<Client>;
  // get(id: string): Promise<T>;
  // getAll(): Promise<T[]>;
  // update(id: string, object: T): Promise<void>;
  // delete(id: string): Promise<void>;
}
