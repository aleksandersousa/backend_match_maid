import { Client } from 'src/entities/Client'
import { Maid } from '../entities/Maid'

export interface IMaidRepository {
  findByEmail(email: string): Promise<Maid>
  saveMaid(maid: Maid, client: Client): Promise<void>
}
