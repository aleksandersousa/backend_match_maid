import { Router } from 'express'
import { createClientController } from './useCases/createClient'
import { createMaidController } from './useCases/createMaid'
import { deleteClientController } from './useCases/deleteClient'
import { deleteMaidController } from './useCases/deleteMaid'

const router = Router()

router.post('/create/client', (request, response) => {
  return createClientController.handle(request, response)
})

router.post('/create/maid', (request, response) => {
  return createMaidController.handle(request, response)
})

router.delete('/delete/client', (request, response) => {
  return deleteClientController.handle(request, response)
})

router.delete('/delete/maid', (request, response) => {
  return deleteMaidController.handle(request, response)
})

export { router }
