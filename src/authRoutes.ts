import { Router } from 'express'
import { createClientController } from './useCases/createClient'
import { createMaidController } from './useCases/createMaid'
import { loginController } from './useCases/login'

const authRouter = Router()

authRouter.post('/create/client', (request, response) => {
  return createClientController.handle(request, response)
})

authRouter.post('/create/maid', (request, response) => {
  return createMaidController.handle(request, response)
})

authRouter.post('/login', (request, response) => {
  return loginController.handle(request, response)
})

export { authRouter }
