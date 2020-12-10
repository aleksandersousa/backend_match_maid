import { Interactions } from '../../entities/Interactions'
import { IInteractionsValidations } from './IInteractionsValidations'
import * as jf from 'joiful'

export class InteractionsValidations implements IInteractionsValidations {
  checkInteractionError (data: Interactions) {
    const { error } = jf.validate(data)
    return error
  }
}
