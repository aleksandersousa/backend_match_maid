import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { FindMaidByIdController } from './GetMaidByIdController'
import { FindMaidByIdUseCase } from './GetMaidByIdUseCase'

const maidRepository = new MySqlMaidRepository()

const findMaidByIdUseCase = new FindMaidByIdUseCase(maidRepository)

const findMaidByIdController = new FindMaidByIdController(findMaidByIdUseCase)

export { findMaidByIdUseCase, findMaidByIdController }
