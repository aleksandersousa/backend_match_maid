import { MySqlClientsRepository } from '../../repositories/implementations/MySqlClientsRepository'
import { GetClientByIdController } from './GetClientByIdController'
import { GetClientByIdUseCase } from './GetClientByIdUseCase'

const clientRepository = new MySqlClientsRepository()

const getClientByIdUseCase = new GetClientByIdUseCase(clientRepository)

const getClientByIdController = new GetClientByIdController(getClientByIdUseCase)

export { getClientByIdUseCase, getClientByIdController }
