import { MySqlClientsRepository } from '../../repositories/implementations/MySqlClientsRepository'
import { DeleteClientController } from './DeleteClientController'
import { DeleteClientUseCase } from './DeleteClientUseCase'

const clientRepository = new MySqlClientsRepository()

const deleteClientUseCase = new DeleteClientUseCase(clientRepository)

const deleteClientController = new DeleteClientController(deleteClientUseCase)

export { deleteClientUseCase, deleteClientController }
