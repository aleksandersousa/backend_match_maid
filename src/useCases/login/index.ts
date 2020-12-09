import { MySqlClientsRepository } from '../../repositories/implementations/MySqlClientsRepository'
import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { LoginController } from './LoginController'
import { LoginUseCase } from './LoginUseCase'

const clientRepository = new MySqlClientsRepository()

const maidRepository = new MySqlMaidRepository()

const loginUseCase = new LoginUseCase(clientRepository, maidRepository)

const loginController = new LoginController(loginUseCase)

export { loginUseCase, loginController }
