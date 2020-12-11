import { Interactions } from 'src/entities/Interactions'
import { IClientRepository } from 'src/repositories/IClientRepository'
import { IInteractionsRepository } from 'src/repositories/IInteractionsRepository'
import { IMaidRepository } from 'src/repositories/IMaidRepository'
import { InteractionsValidations } from 'src/validations/interactions/InteractionsValidations'
import { IInteractRequestDTO } from './InteractDTO'

export class InteractUseCase {
  private _interactionsRepository: IInteractionsRepository
  private _clientRepository: IClientRepository
  private _maidRepository: IMaidRepository

  constructor (
    interactionsRepository: IInteractionsRepository,
    clientRepository: IClientRepository,
    maidRepository: IMaidRepository
  ) {
    this._interactionsRepository = interactionsRepository
    this._clientRepository = clientRepository
    this._maidRepository = maidRepository
  }

  async execute (data: IInteractRequestDTO) {
    const clientAlreadyExists = await this._clientRepository.findClientById(data.clientId)
    const maidAlreadyExists = await this._maidRepository.findMaidById(data.maidId)
    const interactions = await this._interactionsRepository.getAllInteractions()

    if (!clientAlreadyExists || !maidAlreadyExists) {
      throw new Error('Client or maid does not exists.')
    }

    for (let i = 0; i < interactions.length; i++) {
      if (data.accessTime === interactions[i].accessTime) {
        return new Error('ERR DUPENTRY: time already registered.')
      }
    }

    const interaction = new Interactions(data)
    const interactionsValidations = new InteractionsValidations()

    const error = interactionsValidations.checkInteractionError(interaction)

    if (error) {
      throw new Error(error.message)
    }

    await this._interactionsRepository.createInteraction(data)
  }
}
