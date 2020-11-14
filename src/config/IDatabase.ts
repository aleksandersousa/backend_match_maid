export interface IDatabase<T> {
  saveClient(object: T): Promise<void>;
  saveMaid(object: T, object2: T): Promise<void>;
  findClientByEmail(email: String): Promise<Object>;
  findMaidByEmail(email: String): Promise<Object>;
  // get(id: string): Promise<T>;
  // getAll(): Promise<T[]>;
  // update(id: string, object: T): Promise<void>;
  // delete(id: string): Promise<void>;
}
