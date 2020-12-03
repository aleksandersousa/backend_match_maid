import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { ListAllMaidsController } from './ListAllMaidsController'
import { ListAllMaidsUseCase } from './ListAllMaidsUseCase'

const maidRepository = new MySqlMaidRepository()

const listAllMaidsUseCase = new ListAllMaidsUseCase(maidRepository)

const listAllMaidsController = new ListAllMaidsController(listAllMaidsUseCase)

export { listAllMaidsUseCase, listAllMaidsController }
