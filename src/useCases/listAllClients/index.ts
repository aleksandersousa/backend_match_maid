import { MySqlClientsRepository } from '../../repositories/implementations/MySqlClientsRepository'
import { ListAllClientsController } from './ListAllClientsController'
import { ListAllClientsUseCase } from './ListAllClientsUseCase'

const clientRepository = new MySqlClientsRepository()

const listAllClientsUseCase = new ListAllClientsUseCase(clientRepository)

const listAllClientsController = new ListAllClientsController(listAllClientsUseCase)

export { listAllClientsUseCase, listAllClientsController }
