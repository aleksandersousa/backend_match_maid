import { Router } from 'express'
import { createClientController } from './useCases/createClient'
import { createMaidController } from './useCases/createMaid'
import { deleteClientController } from './useCases/deleteClient'
import { deleteMaidController } from './useCases/deleteMaid'
import { rateMaidController } from './useCases/rateMaid'
import { updateClientController } from './useCases/updateClient'
import { updateClientLocationController } from './useCases/updateClientLocation'
import { updateDisponibleDaysController } from './useCases/updateDisponibleDays'
import { udpateDisponiblePeriodController } from './useCases/updateDisponiblePeriod'
import { updateMaidController } from './useCases/updateMaid'
import { updateMaidLocationController } from './useCases/updateMaidLocation'
import { updateServicesController } from './useCases/updateServices'

const router = Router()

router.post('/create/client', (request, response) => {
  return createClientController.handle(request, response)
})

router.post('/create/maid', (request, response) => {
  return createMaidController.handle(request, response)
})

router.delete('/delete/client/:cpf', (request, response) => {
  return deleteClientController.handle(request, response)
})

router.delete('/delete/maid/:cpf', (request, response) => {
  return deleteMaidController.handle(request, response)
})

router.put('/update/client/:cpf', (request, response) => {
  return updateClientController.handle(request, response)
})

router.put('/update/client/clientLocation/:clientCpf', (request, response) => {
  return updateClientLocationController.handle(request, response)
})

router.put('/update/maid/:cpf', (request, response) => {
  return updateMaidController.handle(request, response)
})

router.put('/update/maid/location/:maidCpf', (request, response) => {
  return updateMaidLocationController.handle(request, response)
})

router.put('/update/maid/disponibleDays/:maidCpf', (request, response) => {
  return updateDisponibleDaysController.handle(request, response)
})

router.put('/update/maid/disponiblePeriod/:maidCpf', (request, response) => {
  return udpateDisponiblePeriodController.handle(request, response)
})

router.put('/update/maid/services/:maidCpf', (request, response) => {
  return updateServicesController.handle(request, response)
})

router.post('/update/maid/rating', (request, response) => {
  return rateMaidController.handle(request, response)
})

export { router }
