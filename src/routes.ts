import { Router } from 'express'
import { createClientController } from './useCases/createClient'
import { createMaidController } from './useCases/createMaid'
import { deleteClientController } from './useCases/deleteClient'
import { deleteMaidController } from './useCases/deleteMaid'
import { updateClientController } from './useCases/updateClient'
import { updateClientLocationController } from './useCases/updateClientLocation'
import { updateMaidController } from './useCases/updateMaid'

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

router.put('/update/clientLocation/:clientCpf', (request, response) => {
  return updateClientLocationController.handle(request, response)
})

router.put('/update/maid/:cpf', (request, response) => {
  return updateMaidController.handle(request, response)
})

export { router }
