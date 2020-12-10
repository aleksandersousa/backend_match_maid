import { LogoutController } from './LogoutController'
import { LogoutUseCase } from './LogoutUseCase'

const logoutUseCase = new LogoutUseCase()

const logoutController = new LogoutController(logoutUseCase)

export { logoutUseCase, logoutController }
