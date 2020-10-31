import { Router } from 'express'
import { createUserClientController } from './useCases/createUserClient'

const router = Router()

router.post('/client', (request, response) => {
  return createUserClientController.handle(request, response)
})

export { router }
