import { Router } from 'express'
import { createClientController } from './useCases/createClient'
import { createMaidController } from './useCases/createMaid'
import { deleteClientController } from './useCases/deleteClient'
import { deleteMaidController } from './useCases/deleteMaid'
import { findMaidByIdController } from './useCases/getMaidById'
import { listAllMaidsController } from './useCases/listAllMaids'
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

router.delete('/delete/client/:id', (request, response) => {
  return deleteClientController.handle(request, response)
})

router.delete('/delete/maid/:id', (request, response) => {
  return deleteMaidController.handle(request, response)
})

router.put('/update/client/:id', (request, response) => {
  return updateClientController.handle(request, response)
})

router.put('/update/client/clientLocation/:id', (request, response) => {
  return updateClientLocationController.handle(request, response)
})

router.put('/update/maid/:id', (request, response) => {
  return updateMaidController.handle(request, response)
})

router.put('/update/maid/location/:id', (request, response) => {
  return updateMaidLocationController.handle(request, response)
})

router.put('/update/maid/disponibleDays/:id', (request, response) => {
  return updateDisponibleDaysController.handle(request, response)
})

router.put('/update/maid/disponiblePeriod/:id', (request, response) => {
  return udpateDisponiblePeriodController.handle(request, response)
})

router.put('/update/maid/services/:id', (request, response) => {
  return updateServicesController.handle(request, response)
})

router.post('/update/maid/rating/:id', (request, response) => {
  return rateMaidController.handle(request, response)
})

router.get('/get/maid/:id', (request, response) => {
  return findMaidByIdController.handle(request, response)
})

router.get('/get/maids', (request, response) => {
  return listAllMaidsController.handle(request, response)
})

export { router }
