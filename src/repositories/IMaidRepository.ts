import { Client } from '../entities/Client'
import { MaidLocation } from 'src/entities/MaidLocation'
import { Maid } from '../entities/Maid'
import { ClientLocation } from 'src/entities/ClientLocation'

export interface IMaidRepository {
  findByEmail(email: string): Promise<Maid>
  saveMaid(maid: Maid, client: Client, location: MaidLocation,
    clientLocation: ClientLocation): Promise<void>
}
