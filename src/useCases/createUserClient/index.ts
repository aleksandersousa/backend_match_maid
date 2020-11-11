import { MySqlClientsRepository } from '../../repositories/implementations/MySqlClientsRepository'
import { CreateUserClientController } from './CreateUserClientController'
import { CreateUserClientUseCase } from './CreateUserClientUseCase'

const clientRepository = new MySqlClientsRepository()

const createUserClientUseCase = new CreateUserClientUseCase(
  clientRepository
)

const createUserClientController = new CreateUserClientController(
  createUserClientUseCase
)

export { createUserClientUseCase, createUserClientController }
