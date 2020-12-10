import { MySqlClientsRepository } from 'src/repositories/implementations/MySqlClientsRepository'
import { MySqlInteractionRepository } from 'src/repositories/implementations/MySqlInteractionsRepository'
import { MySqlMaidRepository } from 'src/repositories/implementations/MySqlMaidRepository'
import { InteractController } from './InteractController'
import { InteractUseCase } from './InteractUseCase'

const clientRepository = new MySqlClientsRepository()
const maidRepository = new MySqlMaidRepository()
const interactionsRepository = new MySqlInteractionRepository()

const interactUseCase = new InteractUseCase(interactionsRepository, clientRepository, maidRepository)

const interactController = new InteractController(interactUseCase)

export { interactUseCase, interactController }
