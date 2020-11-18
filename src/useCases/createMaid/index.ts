import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { CreateMaidController } from './CreateMaidController'
import { CreateMaidUseCase } from './CreateMaidUseCase'

const maidRepository = new MySqlMaidRepository()

const createMaidUseCase = new CreateMaidUseCase(maidRepository)

const createMaidController = new CreateMaidController(createMaidUseCase)

export { createMaidUseCase, createMaidController }
