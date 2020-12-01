import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { UpdateServicesController } from './UpdateServicesController'
import { UpdateServicesUseCase } from './UpdateServicesUseCase'

const maidRepository = new MySqlMaidRepository()

const updateServicesUseCase = new UpdateServicesUseCase(maidRepository)

const updateServicesController = new UpdateServicesController(updateServicesUseCase)

export { updateServicesUseCase, updateServicesController }
