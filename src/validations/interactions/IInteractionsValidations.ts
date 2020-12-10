import { Interactions } from '../../entities/Interactions'

export interface IInteractionsValidations {
  checkInteractionError(data: Interactions): void
}
