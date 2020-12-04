import { Client } from '../entities/Client'
import { MaidLocation } from '../entities/MaidLocation'
import { Maid } from '../entities/Maid'
import { ClientLocation } from '../entities/ClientLocation'
import { DisponibleDays } from '../entities/DisponibleDays'
import { DisponiblePeriod } from '../entities/DisponiblePeriod'
import { Services } from '../entities/Services'
import { Rating } from '../entities/Rating'

export interface IMaidRepository {
  saveMaid(
    maid: Maid,
    location: MaidLocation,
    disponibleDays: DisponibleDays,
    disponiblePeriod: DisponiblePeriod,
    services: Services,
    client: Client,
    clientLocation: ClientLocation
  ): Promise<void>
  saveMaidLocation(location: MaidLocation): Promise<void>
  saveMaidDisponibleDays(disponibleDays: DisponibleDays): Promise<void>
  saveMaidDisponiblePeriod(disponiblePeriod: DisponiblePeriod): Promise<void>
  saveMaidServices(services: Services): Promise<void>
  findMaidByEmail(email: string): Promise<Maid>
  findMaidById(id: number): Promise<Maid>
  findRatingByCpf(cpf: string): Promise<Rating>
  deleteMaid(cpf: string): Promise<void>
  updateMaid(maid: Maid, id: number): Promise<void>
  updateMaidLocation(location: MaidLocation): Promise<void>
  updateMaidDisponibleDays(disponibleDays: DisponibleDays): Promise<void>
  updateMaidDisponiblePeriod(disponiblePeriod: DisponiblePeriod): Promise<void>
  updateMaidServices(services: Services): Promise<void>
  updateMaidRating(rating: Rating): Promise<void>
  getMaid(id: number): Promise<Object>
  getMaids(): Promise<[Maid]>
  getAllMaids(): Promise<[Object]>
}
