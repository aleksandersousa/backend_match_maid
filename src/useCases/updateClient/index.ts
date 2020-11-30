import { MySqlClientsRepository } from '../../repositories/implementations/MySqlClientsRepository'
import { UpdateClientController } from './UpdateClientController'
import { UpdateClientUseCase } from './UpdateClientUseCase'

const clientRepository = new MySqlClientsRepository()

const updateClientUseCase = new UpdateClientUseCase(clientRepository)

const updateClientController = new UpdateClientController(updateClientUseCase)

export { updateClientUseCase, updateClientController }
