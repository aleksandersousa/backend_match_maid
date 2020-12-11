import { Interactions } from '../entities/Interactions'

export interface IInteractionsRepository {
  createInteraction(interaction: Interactions): Promise<void>
  getInteractionsById(maidId: number): Promise<[Interactions]>
  getAllInteractions(): Promise<[Interactions]>
}
