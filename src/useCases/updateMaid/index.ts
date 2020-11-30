import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { UpdateMaidController } from './UpdateMaidController'
import { UpdateMaidUseCase } from './UpdateMaidUseCase'

const maidRepository = new MySqlMaidRepository()

const updateMaidUseCase = new UpdateMaidUseCase(maidRepository)

const updateMaidController = new UpdateMaidController(updateMaidUseCase)

export { updateMaidUseCase, updateMaidController }
