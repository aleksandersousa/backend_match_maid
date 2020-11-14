import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { CreateUserMaidController } from './CreateUserMaidController'
import { CreateUserMaidUseCase } from './CreateUserMaidUseCase'

const maidRepository = new MySqlMaidRepository()

const createUserMaidUseCase = new CreateUserMaidUseCase(maidRepository)

const createUserMaidController = new CreateUserMaidController(createUserMaidUseCase)

export { createUserMaidUseCase, createUserMaidController }
