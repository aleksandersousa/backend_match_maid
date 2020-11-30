import { MySqlClientsRepository } from '../../repositories/implementations/MySqlClientsRepository'
import { UpdateClientLocationController } from './UpdateClientLocationController'
import { UpdateClientLocationUseCase } from './UpdateClientLocationUseCase'

const clientRepository = new MySqlClientsRepository()

const updateClientLocationUseCase = new UpdateClientLocationUseCase(clientRepository)

const updateClientLocationController = new UpdateClientLocationController(updateClientLocationUseCase)

export { updateClientLocationUseCase, updateClientLocationController }
