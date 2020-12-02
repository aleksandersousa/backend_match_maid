import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { RateMaidController } from './RateMaidController'
import { RateMaidUseCase } from './RateMaidUseCase'

const maidRepository = new MySqlMaidRepository()

const rateMaidUseCase = new RateMaidUseCase(maidRepository)

const rateMaidController = new RateMaidController(rateMaidUseCase)

export { rateMaidUseCase, rateMaidController }
