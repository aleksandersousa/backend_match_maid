import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { DeleteMaidController } from './DeleteMaidController'
import { DeleteMaidUseCase } from './DeleteMaidUseCase'

const maidRepository = new MySqlMaidRepository()

const deleteMaidUseCase = new DeleteMaidUseCase(maidRepository)

const deleteMaidController = new DeleteMaidController(deleteMaidUseCase)

export { deleteMaidUseCase, deleteMaidController }
