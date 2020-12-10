import { RefreshTokensController } from './RefreshTokensController'
import { RefreshTokensUseCase } from './RefreshTokensUseCase'

const refreshTokensUseCase = new RefreshTokensUseCase()

const refreshTokensController = new RefreshTokensController(refreshTokensUseCase)

export { refreshTokensUseCase, refreshTokensController }
