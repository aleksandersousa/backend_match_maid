import { MySqlMaidRepository } from '../../repositories/implementations/MySqlMaidRepository'
import { UpdateDisponiblePeriodUseCase } from './UpdateDisponiblePeriodUseCase'
import { UpdateDisponiblePeriodController } from './UpdateDisponiblePeriodController'

const maidRespository = new MySqlMaidRepository()

const updateDisponiblePeriodUseCase = new UpdateDisponiblePeriodUseCase(maidRespository)

const udpateDisponiblePeriodController = new UpdateDisponiblePeriodController(updateDisponiblePeriodUseCase)

export { updateDisponiblePeriodUseCase, udpateDisponiblePeriodController }
