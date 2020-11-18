import { MySqlClientsRepository } from '../../repositories/implementations/MySqlClientsRepository'
import { CreateClientController } from './CreateClientController'
import { CreateClientUseCase } from './CreateClientUseCase'

const clientRepository = new MySqlClientsRepository()

const createClientUseCase = new CreateClientUseCase(clientRepository)

const createClientController = new CreateClientController(createClientUseCase)

export { createClientUseCase, createClientController }
