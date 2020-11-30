import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { UpdateMaidLocationController } from './UpdateMaidLocationController'
import { UpdateMaidLocationUseCase } from './UpdateMaidLocationUseCase'

const maidRepository = new MySqlMaidRepository()

const updateMaidLocationUseCase = new UpdateMaidLocationUseCase(maidRepository)

const updateMaidLocationController = new UpdateMaidLocationController(updateMaidLocationUseCase)

export { updateMaidLocationUseCase, updateMaidLocationController }
