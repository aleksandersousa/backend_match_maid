import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { UpdateDisponibleDaysController } from './UpdateDisponibleDaysController'
import { UpdateDisponibleDaysUseCase } from './UpdateDisponibleDaysUseCase'

const maidRepository = new MySqlMaidRepository()

const updateDisponibleDaysUseCase = new UpdateDisponibleDaysUseCase(maidRepository)

const updateDisponibleDaysController = new UpdateDisponibleDaysController(updateDisponibleDaysUseCase)

export { updateDisponibleDaysUseCase, updateDisponibleDaysController }
