import { Router } from 'express'
import { loginController } from './useCases/login'

const authRouter = Router()

authRouter.post('/login', (request, response) => {
  return loginController.handle(request, response)
})

export { authRouter }
