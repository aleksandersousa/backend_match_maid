import { Router } from 'express'
import { deleteClientController } from './useCases/deleteClient'
import { deleteMaidController } from './useCases/deleteMaid'
import { getClientByIdController } from './useCases/getClientById'
import { findMaidByIdController } from './useCases/getMaidById'
import { listAllClientsController } from './useCases/listAllClients'
import { listAllMaidsController } from './useCases/listAllMaids'
import { rateMaidController } from './useCases/rateMaid'
import { updateClientController } from './useCases/updateClient'
import { updateClientLocationController } from './useCases/updateClientLocation'
import { updateDisponibleDaysController } from './useCases/updateDisponibleDays'
import { udpateDisponiblePeriodController } from './useCases/updateDisponiblePeriod'
import { updateMaidController } from './useCases/updateMaid'
import { updateMaidLocationController } from './useCases/updateMaidLocation'
import { updateServicesController } from './useCases/updateServices'
import { verifyAccessToken } from './helpers/jwtHelpers'
import { interactController } from './useCases/interact'

const router = Router()

router.post('/create/maid/rating/:id', verifyAccessToken, (request, response) => {
  return rateMaidController.handle(request, response)
})

router.post('/create/interaction', verifyAccessToken, (request, response) => {
  return interactController.handle(request, response)
})

router.delete('/delete/client/:id', verifyAccessToken, (request, response) => {
  return deleteClientController.handle(request, response)
})

router.delete('/delete/maid/:id', verifyAccessToken, (request, response) => {
  return deleteMaidController.handle(request, response)
})

router.put('/update/client/:id', verifyAccessToken, (request, response) => {
  return updateClientController.handle(request, response)
})

router.put('/update/client/clientLocation/:id', verifyAccessToken, (request, response) => {
  return updateClientLocationController.handle(request, response)
})

router.put('/update/maid/:id', verifyAccessToken, (request, response) => {
  return updateMaidController.handle(request, response)
})

router.put('/update/maid/location/:id', verifyAccessToken, (request, response) => {
  return updateMaidLocationController.handle(request, response)
})

router.put('/update/maid/disponibleDays/:id', verifyAccessToken, (request, response) => {
  return updateDisponibleDaysController.handle(request, response)
})

router.put('/update/maid/disponiblePeriod/:id', verifyAccessToken, (request, response) => {
  return udpateDisponiblePeriodController.handle(request, response)
})

router.put('/update/maid/services/:id', verifyAccessToken, (request, response) => {
  return updateServicesController.handle(request, response)
})

router.get('/get/client/:id', verifyAccessToken, (request, response) => {
  return getClientByIdController.handle(request, response)
})

router.get('/get/clients', verifyAccessToken, (request, response) => {
  return listAllClientsController.handle(request, response)
})

router.get('/get/maid/:id', verifyAccessToken, (request, response) => {
  return findMaidByIdController.handle(request, response)
})

router.get('/get/maids', verifyAccessToken, (request, response) => {
  return listAllMaidsController.handle(request, response)
})

export { router }
