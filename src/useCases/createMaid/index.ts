import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { CreateUserMaidController } from './CreateMaidController'
import { CreateUserMaidUseCase } from './CreateMaidUseCase'

const maidRepository = new MySqlMaidRepository()

const createUserMaidUseCase = new CreateUserMaidUseCase(maidRepository)

const createUserMaidController = new CreateUserMaidController(createUserMaidUseCase)

export { createUserMaidUseCase, createUserMaidController }
