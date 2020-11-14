import { Router } from 'express'
import { createUserClientController } from './useCases/createUserClient'
import { createUserMaidController } from './useCases/createUserMaid'

const router = Router()

router.post('/create/client', (request, response) => {
  return createUserClientController.handle(request, response)
})

router.post('/create/maid', (request, response) => {
  return createUserMaidController.handle(request, response)
})

export { router }
